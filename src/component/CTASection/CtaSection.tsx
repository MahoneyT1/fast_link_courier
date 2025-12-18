import React from 'react';
import Button from '../Button';
import CtaImage from '../../assets/cta2.png'
import { useNavigate } from 'react-router-dom';


const CtaSection: React.FC = () => {
    const navigateToCreateShipment = useNavigate();

    const handlCreateShipmentButton = ()=> {
        navigateToCreateShipment('/create-shipment');
    }
  return (
    <section style={{
        backgroundImage: `url(${CtaImage})`,
    }}
    className='w-full bg-gradient-to-r from-blue-800
     to-blue-100 py-40 bg-[79%_50%] text-white  
        place-items-center'>

        <div className="container mt-7  xl:w-[600px] flex flex-col justify-center items-center">

            <div className='text-center text-2xl mt-5 relative z-10'>
                <h4 className='mt-5 text-3xl font-semibold lg:text-5xl'>Ready to Ship ?</h4>
            </div>

            <div className='mt-5'>
                <p className='text-center text-lg'>Start your seamless shipping journey today. Quick, reliable, and hassle-free logistics at your fingertips.</p>
            </div>

            <div className='mt-10  '>
                <Button buttonName='Create Shipment'
                    className='rounded-4xl bg-gradient-to-r from-green-900 to-green-300
                    p-3 border'
                onClickFunc={()=> handlCreateShipmentButton()}
                />
            </div>
        </div>

       


    </section>
  )
}

export default CtaSection;
