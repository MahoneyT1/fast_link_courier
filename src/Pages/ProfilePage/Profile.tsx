import React, { useEffect, useState } from 'react'
import { getUserPackages } from '../../services';


const Profile: React.FC = () => {
    const [packages, setPackages ] = useState<any[]>([]);
    const [packageCount, setPackageCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [approvedCount, setApprovedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    // fetch the user profile data from the backend or context here

    useEffect(() => { 
        const fetchProfileData = async () => {
            
            const packages = await getUserPackages();
            setPackages(packages);
            setPackageCount(packages.length);

            const pending = packages.filter((pkg: any) => pkg.status === 'pending');
            setPendingCount(pending.length);

            const approved = packages.filter((pkg: any) => pkg.status === 'approved');
            setApprovedCount(approved.length);

            const rejected = packages.filter((pkg: any) => pkg.status === 'rejected');
            setRejectedCount(rejected.length);
        }
        fetchProfileData();
    }, []);
  return (
      <section className="w-full">
        <div className="container mx-auto px-4 py-15 pb-3">
            <div className="mb-8 px-2 text-center md:text-center lg:text-center">
                <h1 className="text-4xl font-bold mb-2 text-primary ">
                    Profile Page
                </h1>
                
                <p className="text-primary/80 lg:text-2xl font-semibold">
                    Package information
                </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-4 mb-8">
                <div className="rounded-lg border bg-card text-primary shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">
                            Total Packages
                        </h3>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                        stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-text h-4 w-4 text-muted-foreground"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                    </div>
                    
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">
                            {packageCount}
                        </div>
                    </div>
                </div>
            
                <div className="rounded-lg border bg-card text-primary shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">
                            Pending
                        </h3><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock h-4 w-4 text-yellow-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    
                    <div className="p-6 pt-0">
                        <div className="text-2xl font-bold">
                            {pendingCount}
                        </div>
                        
                    </div>
                </div>
            
                <div className="rounded-lg border bg-card text-primary shadow-sm">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">
                            Approved
                        </h3>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check-big h-4 w-4 text-green-600"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg></div>
                        
                        <div className="p-6 pt-0">
                            <div className="text-2xl font-bold">
                                {approvedCount}
                            </div>
                        </div>
                        
                    </div>
                
                    <div className="rounded-lg border bg-card text-primary shadow-sm">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">
                                Rejected
                            </h3>
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                            className="lucide lucide-circle-x h-4 w-4 text-red-600"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg></div>
                            
                            <div className="p-6 pt-0">
                                <div className="text-2xl font-bold">
                                    {rejectedCount}
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    { packages && (
                        <div className='mt-20'>
                            <h2 className="text-2xl font-bold mb-4 text-primary text-center">
                                Your Packages
                            </h2>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-primary/70">
                                    <thead>
                                        <tr className='text-primary text-center '>
                                            <th className="py-2 px-4 border-b ">Recipient Name</th>
                                            <th className="py-2 px-4 border-b ">Address</th>
                                            <th className="py-2 px-4 border-b">Phone Number</th>
                                            <th className="py-2 px-4 border-b">Description</th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {packages.map((pkg) => (
                                            <tr key={pkg.id} className='font-semibold text-primary/60 text-center'>
                                                <td className="py-2 px-4 border-b">{pkg.recipient_name}</td>
                                                <td className="py-2 px-4 border-b">{pkg.recipient_address}</td>
                                                <td className="py-2 px-4 border-b">{pkg.recipient_phone_number}</td>
                                                <td className="py-2 px-4 border-b">{pkg.description}</td>
                                                <td className="py-2 px-4 border-b capitalize">{pkg.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                
                    
                </div>
    </section>
  )
}

export default Profile
