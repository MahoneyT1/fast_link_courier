import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Locate, Calendar, Package, Truck, User,
  Bell, PhoneIncoming, CheckCircle, Navigation,
} from 'lucide-react';
import "./Track.css";
import trackBackground from "../../assets/trackBackground.png"
import { toast } from 'react-toastify';


const PackageDetailPage: React.FC = () => {
  // obtain data in the url
  const navigate = useNavigate();
  const location = useLocation();
  const packageData = location.state?.package;

  // use useEffect to redirect to the track page if no data is passed
  useEffect((): any => {
    try {
      if (!packageData) {
        navigate('/track');
      };

    } catch (err) {
      toast.error("No package data found. Please enter a valid tracking ID.");
      navigate('/track');
    }


  }, [packageData, navigate]);

  console.log(packageData);

  return (
    <section
    style={{
        backgroundImage: `url(${trackBackground})`,
        backgroundPosition: "40%",
        width: "100%"
    }} className='w-full shadow-lg 
    min-h-[150vh] grid grid-cols-1 p-3
    lg:px-20 pb-15'>

      {/* Package details section */}
      <div className='mt-10 '>
        <h2 className='text-lg font-bold'>Package Details</h2>

        <div className='flex gap-3 mt-4  
           py-3'>
          <span
            className='bg-blue-200/30 rounded flex 
            items-center justify-center w-[40px] h-[35px]'>
            <Package size={20} />
          </span>
          <div>
            <p
              className='text-primary text-sm font-bold leading-1.5'>
              I.D  <span className='text-green-700 text-sm font-semibold '> <br /> {packageData?.id} </span></p>
          </div>

        </div>

        { packageData?.deliveries && packageData?.deliveries?.length > 0 ? ( 
          packageData?.deliveries?.map((deliveryItem: any, deliveryIndex: number) => (
          <div key={deliveryIndex} className='min-h-[250vh]'>

       

            <div className=' flex gap-3 mt-6 py-3'>

              <span
                className='flex justify-center bg-blue-200/30 
                rounded items-center w-[40px] h-[40px]'>
                <Truck size={20} className='text-gray-800' />
              </span>

              <div className='col-span-1'>
                <p className=' text-primary font-bold'>Delivery Type</p>
                <span className='text-sm text-green-700 font-bold'>{deliveryItem.delivery_type}</span>
              </div>

            </div>

            <div className='flex gap-3 mt-6  py-3'>
              <span className='flex justify-center bg-blue-200/30
                rounded items-center w-[45px] h-[45px]'>
                <Calendar size={20} />
              </span>

              <div className=''>
                <p className='text-primary font-bold'>Delivery Date</p>
                <span className='text-sm text-green-700 font-bold'>{deliveryItem.estimated_delivery_date}</span>
              </div>

            </div>

            {/* delivery-status */}
            <div className='flex gap-3 mt-8  py-3'>
              <span className='flex justify-center bg-blue-200/30 
                rounded items-center w-[45px] h-[45px]'>
                <Bell size={20} />
              </span>

              <div className=''>
                <p className='text-primary font-bold'>Delivery Status</p>
                <span className='text-sm text-green-700 font-bold'>{deliveryItem.current_status}</span>
              </div>

            </div>

            {/* Sender's detail section */}
            <div className='mt-10'>
              <h2 className='text-lg font-bold text-primary'>Sender's Details</h2>

              <div className='flex gap-3 mt-6 py-3'>
                <span className='flex justify-center bg-blue-200/30 
                  rounded items-center w-[45px] h-[45px]'>
                  <User size={20} />
                </span>

                <div className=''>
                  <p className='text-primary font-bold'>Sender's Name</p>
                  <span className='text-sm text-green-700 font-bold'>{packageData.user.full_name}</span>
                </div>

              </div>

              <div className='flex gap-3 mt-6 py-3'>
                <span className='flex justify-center bg-blue-200/30 
                  rounded items-center w-[45px] h-[45px]'>
                  <Locate size={20} />
                </span>

                <div className=''>
                  <p className='text-primary font-bold'>Sender's Address</p>
                  <span className='text-sm text-green-700 font-bold'>{packageData.user.address}</span>
                </div>

              </div>

              <div className='flex gap-3 mt-6 py-3'>
                <span className='flex justify-center bg-blue-200/30
                  rounded items-center w-[45px] h-[45px]'>
                  <PhoneIncoming size={20} />
                </span>

                <div className=''>
                  <p className='text-primary font-bold'>Phone Number</p>
                  <span className='text-sm text-green-700 font-bold'>{packageData.user.phone_number}</span>
                </div>

              </div>
            </div>
            

            {/* Receiver's Detail */}
            <div className='mt-10'>
              <h2 className='text-lg font-bold text-primary'>Receiver's Details</h2>

              <div className='flex gap-3 mt-6 py-3'>
                <span className='flex justify-center bg-blue-200/30 
                  rounded items-center w-[45px] h-[45px]'>
                  <User size={20} />
                </span>

                <div className=''>
                  <p className='text-primary font-bold'>Recipient's Name</p>
                  <span className='text-sm text-green-700 font-bold'>{packageData.recipient_name}</span>
                </div>

              </div>

              <div className='flex gap-3 mt-6 py-3'>
                <span className='flex justify-center bg-blue-200/30 
                  rounded items-center w-[45px] h-[45px]'>
                  <Locate size={20} />
                </span>

                <div className=''>
                  <p className='text-primary font-bold'>Recipient's Address</p>
                  <span className='text-sm text-green-700 font-bold'>{packageData.recipient_address}</span>
                </div>

              </div>

              <div className='flex gap-3 mt-6 py-3'>
                <span className='flex justify-center bg-blue-200/30
                  rounded items-center w-[45px] h-[45px]'>
                  <PhoneIncoming size={20} />
                </span>

                <div className=''>
                  <p className='text-primary font-bold'>Phone Number</p>
                  <span className='text-sm text-green-700 font-bold'>{packageData.recipient_phone_number}</span>
                </div>
              </div>
            </div>

            < div className='mt-10 ' >
              <h2 className='text-lg font-bold mb-5'>Tracking History</h2>

              {/* Tracking History */}                
              
              <div className='flex items-center gap-3 '>
                <CheckCircle size={15} className=''/>

                <div className='text-sm text-primary '>
                  <p className=''>Package Delivered</p>
                  
                </div>
                <div className='box'></div>

              </div>
            
                <div className='flex items-center gap-3  mt-15'>
                  <Truck size={15} className='' />

                  <div className='text-sm text-primary '>
                    <p className=''>Out for Delivery</p>
                  
                  </div>
                  <div className='box'></div>

                </div>

                <div className='flex items-center gap-3 mt-15'>
                  <Navigation size={15} className='' />

                  <div className='text-sm text-primary '>
                    <p className=''>Package Arrived at the Delivery Hub</p>
                    
                  </div>
                  <div className='box'></div>

                </div>

            
                <div className='flex items-center gap-3 mt-15'>
                  <Package size={15} className='' />

                  <div className='text-sm text-primary '>
                    <p className=''>Package Shipped</p>
                      
                    </div>
                  <div className='box'></div>
                </div>
            </div>
          
          </div>
          ))
        ) : (
          <div>No delivery information available.</div>
        )}
      </div>
    </section>
  )
}

export default PackageDetailPage;
