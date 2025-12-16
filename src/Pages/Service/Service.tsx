import React from 'react';
import Button from '../../component/Button';
import Card from '../../component/Card/Card';
import { serviceCardData } from './ServiceCardData';
import mycontainer from "../../assets/cta.png"
import { motion } from "framer-motion"



const Service:React.FC = () => {
    const handleClick = ()=> { console.log("worked") }


  return (
    <section className='bg-white w-full  min-h-[100vh] py-15 p-3'>

        <div className='text-white  bg-primary p-3 rounded-2xl md:p-5 lg:mx-40 md:justify-center'>

            <div className='w-full text-center py-2'>
                <span className='text-blue-900 ms-2 text-sm text-center  bg-gradient-to-r 
                    from-blue-200 via-blue-200 to-blue-50/70 rounded-2xl px-3 py-1 '>
                    <i className="fa-solid fa-location-dot text-blue-900 
                    "></i> 
                    Trusted Global Courier Partner
                </span>
            </div>
           

            <h1 className='text-4xl text-center font-bold mt-3 md:text-5xl'>Logistics that Drive Your Business Forward</h1>
            <p className='mt-5 text-center text-lg text-white md:text-2xl md:mt-5'>Seamless, secure shipping for every destination. 
                Move your cargo with confidence—air, ocean, and ground,
                powered by tech, driven by trust.
            </p>

            <div className='mt-8 flex flex-col gap-1 justify-center items-center md:flex-row md:gap-5'>
                <div className='m-1'>
                    <Button buttonName='Track Your Shipment'
                    className='bg-green-700 p-2 text-gray-200 rounded-lg md:p-4'
                    onClickFunc={handleClick}/>
                </div>

                <div className='m-1'>
                    <Button buttonName='Explore our services'
                    className='border-1 p-2 rounded-lg  md:p-4' onClickFunc={handleClick} 
                    titleStyle='text-primary font-lg'/>
                </div>
            </div>
        </div>

        <motion.div className='grid grid-cols-1 py-10 gap-4 md:grid-cols-3 
            md:mt-10 md:gap-3 lg:p-10 lg:gap-7'
            initial={{
                x: -300,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            
            }}
            transition={{
                delay: 1.5,
                ease: "easeIn",
                stiffness: 2,
                duration: 2
            }}
            >
            {
                serviceCardData.map((item, index)=> (
                    <div key={index} className='rounded-2xl  col-span-1'>
                        <Card cardIcon={item.icon} cardTitle={item.title}
                        cardBody={item.body} className='shadow-[1px_1px_20px_1px_gray] bg-white
                         ' iconClass='rounded-full bg-primary p-4 flex 
                            items-center justify-center shadow w-16 h-16'
                            />
                    </div>
                ))
            }
        </motion.div>

        {/* flex two columns */}
        
        <div className='flex flex-col md:flex-row md:mt-20 bg-primary'>
            {/* text-area */}
            <div className='mt-5 p-4  lg:px-8 flex-2'>
                <h2 className='text-3xl font-extrabold text-white mb-4'>Why Choose Us ?</h2>

                <div className='text-blue-100 flex flex-col gap-4'>
                    <p >
                        <span className='font-bold text-blue-400'>24/7 Shipment Visibility: </span>
                        Advanced tracking from pickup to delivery.
                    </p>

                    <p>
                        <span className='font-bold text-blue-400'>Real Humans, Real Support: </span>
                        Dedicated Logistics specialists for your every need.
                    </p>

                    <p>
                        <span className='font-bold text-blue-400'>On-time, Every Time: </span>
                        99.9% on-time delivery record your deadlines matter.
                    </p>

                    <p >
                        <span className='font-bold text-blue-400'>Secure & Compliant: </span>
                        Safe, insured, and globally complaint operations.
                    </p>
                    <Button buttonName='Get a logistics Quote'
                    onClickFunc={handleClick} className='bg-gradient-to-r from-green-700 p-3  rounded mt-9 text-white font-semibold
                     border-1 border-white '/>
                </div>
            </div>

            <div className='p-3 rounded flex justify-center flex-3'>
                <img src={mycontainer} alt="container image" className='
                rounded' />
            </div>
        </div>
        
    </section>
  )
}

export default Service;
