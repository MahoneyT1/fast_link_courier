import React, { useEffect, useRef, useState } from "react";
import {
    getAllPackages,
    updatePackageStatus,
    deletePackage,
    updatePaidStatus,
    updatePackagePrice,
} from "../../services";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";


const AdminPage: React.FC = () => {
    const [packages, setPackages] = useState<any[]>([]);
    const [priceDraft, setPriceDraft] = useState<Record<string, number>>({});
    const [receiptData, setReceiptData] = useState<FormType | null>(null);

    const receiptRef = useRef<HTMLDivElement | null>(null);

    /* -------------------- PRINT RECEIPT -------------------- */
    const printReceipt = async () => {
        if (!receiptRef.current) return;

        const canvas = await html2canvas(receiptRef.current, {
            scale: 2,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        const win = window.open("", "_blank");
        if (!win) return;

        win.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            img { width: 100%; }
          </style>
        </head>
        <body>
          <img src="${imgData}" />
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = () => window.close();
            };
          </script>
        </body>
      </html>
    `);

        win.document.close();
    };

    /* -------------------- FETCH DATA -------------------- */
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getAllPackages();
                setPackages(data);
            } catch (err) {
                console.error("Error fetching packages:", err);
            }
        };
        fetchPackages();
    }, []);

    /* -------------------- AUTO PRINT -------------------- */
    useEffect(() => {
        if (!receiptData) return;
        const timer = setTimeout(printReceipt, 500);
        return () => clearTimeout(timer);
    }, [receiptData]);

    /* -------------------- HANDLERS -------------------- */
    const handleStatusChange = async (id: string, status: string) => {
        await updatePackageStatus(id, status);
        setPackages((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status } : p))
        );
    };

    const handlePriceSave = async (id: string) => {
        const newPrice = priceDraft[id];
        if (!newPrice) return;

        await updatePackagePrice(id, newPrice);
        setPackages((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, totalPrice: newPrice } : p
            )
        );
    };

    /* -------------------- RENDER -------------------- */
    return (
        <section>
            {/* HEADER */}
            <div className="container mx-auto px-4 py-10 text-center">
                <h1 className="text-2xl font-bold text-primary mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-primary/70 font-semibold">
                    Manage Packages & Update Package Status
                </p>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto px-4 text-center">
                {packages.length === 0 ? (
                    <p>No packages found.</p>
                ) : (
                    <table className="min-w-full border border-gray-200 mt-6">
                        <thead>
                            <tr className="text-primary">
                                <th className="border px-4 py-2">Package ID</th>
                                <th className="border px-4 py-2">Receiver</th>
                                <th className="border px-4 py-2">Email</th>
                                <th className="border px-4 py-2">Payment</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Receipt</th>
                            </tr>
                        </thead>

                        <tbody>
                            {packages.map((pkg) => (
                                <tr key={pkg.id} className="text-primary/70 font-semibold">
                                    <td className="border px-4 py-2">{pkg.id}</td>
                                    <td className="border px-4 py-2">{pkg.recipientName}</td>
                                    <td className="border px-4 py-2">{pkg.recipientEmail}</td>

                                    {/* PAYMENT */}
                                    <td className="border px-4 py-2">
                                        <select
                                            value={pkg.paid ? "true" : "false"}
                                            onChange={async (e) => {
                                                const paid = e.target.value === "true";
                                                await updatePaidStatus(pkg.id, paid);
                                                setPackages((prev) =>
                                                    prev.map((p) =>
                                                        p.id === pkg.id ? { ...p, paid } : p
                                                    )
                                                );
                                            }}
                                            className="border rounded px-2 py-1"
                                        >
                                            <option value="true">Paid</option>
                                            <option value="false">Not Paid</option>
                                        </select>
                                    </td>

                                    {/* STATUS */}
                                    <td className="border px-4 py-2 flex justify-center gap-2">
                                        <select
                                            value={pkg.status}
                                            onChange={(e) =>
                                                handleStatusChange(pkg.id, e.target.value)
                                            }
                                            className="border rounded px-2 py-1"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_transit">In Transit</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                        <button
                                            onClick={async () => {
                                                await deletePackage(pkg.id);
                                                setPackages((prev) =>
                                                    prev.filter((p) => p.id !== pkg.id)
                                                );
                                            }}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                    {/* PRICE */}
                                    <td className="border px-4 py-2">
                                        <input
                                            type="number"
                                            defaultValue={pkg.totalPrice}
                                            onChange={(e) =>
                                                setPriceDraft({
                                                    ...priceDraft,
                                                    [pkg.id]: Number(e.target.value),
                                                })
                                            }
                                            className="border rounded px-2 py-1 w-20 text-center"
                                        />
                                        <button
                                            onClick={() => handlePriceSave(pkg.id)}
                                            className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Save
                                        </button>
                                    </td>

                                    {/* RECEIPT */}
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() =>
                                                setReceiptData({
                                                    receiptNo: pkg.id,
                                                    senderName: pkg.senderName,
                                                    senderEmail: pkg.senderEmail,
                                                    receiverName: pkg.recipientName,
                                                    receiverEmail: pkg.recipientEmail,
                                                    weight: pkg.weight,
                                                    price: pkg.totalPrice,
                                                    status: pkg.status,
                                                    deliveryDate: pkg.pickupDate,
                                                    paid: pkg.paid,
                                                })
                                            }
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

            {/* OFF-SCREEN RECEIPT (NO COLORS) */}
            {receiptData && (
                <div className="fixed -left-[9999px] top-0">
                    <div
                        ref={receiptRef}
                        className="w-[750px] bg-white text-black border border-black p-6 text-sm"
                    >
                        {/* HEADER */}
                        <div className="flex justify-between items-center border-b border-black pb-3 mb-4">
                            <div>
                                <h1 className="text-2xl font-bold uppercase">
                                    Global-Logistick
                                </h1>
                                <p className="text-xs">Air Waybill / Shipment Receipt</p>
                            </div>

                            <div className="text-right">
                                <p className="font-bold text-lg">{receiptData.receiptNo}</p>
                                <p className="text-xs uppercase">Accounts Copy</p>
                            </div>
                        </div>

                        {/* TOP META */}
                        <div className="grid grid-cols-4 gap-4 border border-black p-3 mb-4">
                            <div>
                                <p className="font-semibold">Pickup Date</p>
                                <p>{receiptData.pickupDate || "—"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Delivery Date</p>
                                <p>{receiptData.deliveryDate}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Origin</p>
                                <p>{receiptData.origin || "—"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Destination</p>
                                <p>{receiptData.destination || "—"}</p>
                            </div>
                        </div>

                        {/* SHIPPER & CONSIGNEE */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="border border-black p-3">
                                <p className="font-bold mb-1">Shipper</p>
                                <p>{receiptData.senderName}</p>
                                <p>{receiptData.senderEmail}</p>
                                <p>{receiptData.senderAddress || ""}</p>
                            </div>

                            <div className="border border-black p-3">
                                <p className="font-bold mb-1">Consignee</p>
                                <p>{receiptData.receiverName}</p>
                                <p>{receiptData.receiverEmail}</p>
                                <p>{receiptData.receiverAddress || ""}</p>
                            </div>
                        </div>

                        {/* SHIPMENT INFO */}
                        <div className="grid grid-cols-4 gap-4 border border-black p-3 mb-4">
                            <div>
                                <p className="font-semibold">Courier</p>
                                <p>{receiptData.courier || "Global-Logistick"}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Mode</p>
                                <p>Air Freight</p>
                            </div>
                            <div>
                                <p className="font-semibold">Status</p>
                                <p className="uppercase">{receiptData.status}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Payment</p>
                                <p>{receiptData.paid ? "Paid" : "Pending"}</p>
                            </div>
                        </div>

                        {/* PACKAGE TABLE */}
                        <table className="w-full border border-black mb-4">
                            <thead>
                                <tr className="border-b border-black">
                                    <th className="border-r border-black p-2 text-left">Package</th>
                                    <th className="border-r border-black p-2 text-left">Weight</th>
                                    <th className="border-r border-black p-2 text-left">Quantity</th>
                                    <th className="p-2 text-left">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-r border-black p-2">
                                        {receiptData.packageName || "Package"}
                                    </td>
                                    <td className="border-r border-black p-2">
                                        {receiptData.weight}
                                    </td>
                                    <td className="border-r border-black p-2">1</td>
                                    <td className="p-2">₦{receiptData.price}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* COMMENT + QR */}
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="col-span-2 border border-black p-3">
                                <p className="font-semibold mb-1">Comment</p>
                                <p>PACKAGE IN TRANSIT</p>
                            </div>

                            <div className="flex flex-col items-center border border-black p-3">
                                <QRCodeSVG
                                    value={`https://yourtrackingurl.com/track/${receiptData.receiptNo}`}
                                    width={100}
                                    height={100}
                                />

                                <p className="text-xs mt-2">Scan to Track</p>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="mt-4 text-center text-xs border-t border-black pt-2">
                            This document serves as an official shipment receipt.
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
};

export default AdminPage;
