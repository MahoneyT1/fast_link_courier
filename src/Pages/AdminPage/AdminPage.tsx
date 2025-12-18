import React, { useState, useEffect} from 'react';
import { getAllPackages, updatePackageStatus, deletePackage, updatePaidStatus, updatePackagePrice } from '../../services';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const AdminPage: React.FC = () => {

    const [packages, setPackages] = useState<any[]>([]);
    const [priceDraft, setPriceDraft] = useState<Record<string, number>>({});
    const [receiptData, setReceiptData] = useState<FormType | null>(null);




     const downloadReceipt = async () => {
            const receipt = document.getElementById("receipt");
    
            const canvas = await html2canvas(receipt as HTMLElement);
            const imgData = canvas.toDataURL("image/png");
    
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
            pdf.save("receipt.pdf");
        };

    useEffect(()=> {
        const fetchPackages = async () => {

            try {
                const data = await getAllPackages();
                setPackages(data);
                    
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        }
        fetchPackages();
    }, [])

    const handleStatusChange = async (id: string, status: string) => {
        try {
            // Update package status in the backend
            await updatePackageStatus(id, status);
            // Update local state
            setPackages((prevPackages) =>
                prevPackages.map((pkg) =>
                    pkg.id === id ? { ...pkg, status } : pkg
                )
            );
        } catch (error) {
            console.error("Error updating package status:", error);
        }
    };

    const handlePriceChange = async (id: string, newPrice: number) => {
        try {
            await updatePackagePrice(id, newPrice);
            setPackages((prevPackages) =>
                prevPackages.map((pkg) =>
                    pkg.id === id ? { ...pkg, totalPrice: newPrice } : pkg
                )
            );
        } catch (error) {
            console.error("Error updating package price:", error);
        }
    };

  return (
    <section>
          <div className="container mx-auto px-4 py-15 pb-3 text-center">
            <h1 className="text-2xl font-bold mb-4  text-primary">Admin Dashboard</h1>
            <p className='text-primary/70 font-semibold'>Manage Packages & Update Package status</p>

        </div>

          <div className='overflow-x-auto text-center'>

            {packages.length === 0 ? (
                <p>No packages found.</p>
            ) : (
                <table className="min-w-full border-collapse border mt-10 border-gray-200">
                    <thead>
                        <tr className='text-primary'>
                            <th className="border border-gray-300 px-4 py-2">Package ID</th>
                            <th className="border border-gray-300 px-4 py-2">Reciever's name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Payment status</th>
                            <th className="border border-gray-300 px-4 py-2">Package status</th>
                            <th className="border border-gray-300 px-4 py-2">Charged price</th>
                            <th className="border border-gray-300 px-4 py-2">Download receipt</th>

                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg.id} className='text-primary/70 font-semibold'>
                                <td className="border border-gray-300 px-4 py-2">{pkg.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{pkg.recipientName}</td>
                                <td className="border border-gray-300 px-4 py-2">{pkg.recipientEmail}</td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <select 
                                        value={pkg.paid ? "true" : "false"}
                                        onChange={async (e) => {
                                            const paidStatus = e.target.value === "true";

                                            try {
                                                await updatePaidStatus(pkg.id, paidStatus);

                                                setPackages((prevPackages) =>
                                                    prevPackages.map((p) =>
                                                        p.id === pkg.id ? { ...p, paid: paidStatus } : p
                                                    )
                                                );
                                            } catch (error) {
                                                console.error("Error updating payment status:", error);
                                            }
                                        }}>   
                                        <option value={"true"}>Paid</option>
                                        <option value={"false"}>Not paid</option>
                                    </select>
                                </td>

                                <td className="border border-gray-300 px-4 py-2 flex items-center justify-between gap-2">
                                    <select
                                        value={pkg.status}
                                        onChange={(e) => handleStatusChange(pkg.id, e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_transit">In Transit</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>

                                    <button
                                        onClick={async () => {
                                            try {
                                                await deletePackage(pkg.id);
                                                setPackages((prevPackages) =>
                                                    prevPackages.filter((p) => p.id !== pkg.id)
                                                );
                                            } catch (error) {
                                                console.error("Error deleting package:", error);
                                            }
                                        }}
                                        className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>

                                <td className="border border-gray-300 ">

                                    <input
                                        type="number"
                                        defaultValue={pkg.totalPrice}
                                        onChange={(e) =>
                                            setPriceDraft({
                                                ...priceDraft,
                                                [pkg.id]: Number(e.target.value),
                                            })
                                        }
                                        className="text-primary text-center border rounded px-2 py-1"
                                    />


                                    <button
                                        onClick={() =>
                                            handlePriceChange(pkg.id, priceDraft[pkg.id])
                                        }
                                        className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Save
                                    </button>

                                        
                                </td>

                                <td>
                                    <button
                                        onClick={async () => {
                                            setReceiptData({
                                                receiptNo: pkg.id,
                                                senderName: pkg.senderName,
                                                senderEmail: pkg.senderEmail,
                                                receiverName: pkg.recipientName,
                                                receiverEmail: pkg.recipientEmail,
                                                weight: pkg.weight,
                                                price: pkg.totalPrice,
                                                status: pkg.status,
                                                deliveryDate: pkg.pickupData,
                                                paid: pkg.paid,
                                            });
                                            setTimeout(() => {
                                                downloadReceipt();
                                            }, 100); //
                                        }}
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>

          {receiptData && (
              <div id="receipt">
                  
                  <h2>Package Receipt</h2>
                  <p><strong>Receipt No:</strong> {receiptData.receiptNo}</p>
                  <p><strong>Sender's Name:</strong> {receiptData.senderName}</p>
                  <p><strong>Sender's Email:</strong> {receiptData.senderEmail}</p>
                  <p><strong>Receiver's Name:</strong> {receiptData.receiverName}</p>
                  <p><strong>Receiver's Email:</strong> {receiptData.receiverEmail}</p>
                  <p><strong>Package:</strong> {receiptData.packageName}</p>
                  <p><strong>Weight:</strong> {receiptData.weight}</p>
                  <p><strong>Amount:</strong> ₦{receiptData.price}</p>
                  <p><strong>Status:</strong> {receiptData.status}</p>
                  <p><strong>Expected Delivery Date:</strong> {receiptData.deliveryDate}</p>
              </div>

          )}
    </section>
  )
}


export default AdminPage;
