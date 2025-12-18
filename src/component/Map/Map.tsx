import React from 'react';
import MapView from './MapView';
import { LucideBuilding, LucidePhone, LucideMail } from 'lucide-react';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import landingPage from "../../assets/landingPlane.jpg"



const Map: React.FC = () => {

    // Button send message form
    const { register, handleSubmit, formState: { errors } } = useForm();
    

    //submit form handler
    function submitForm (data: any) {
        console.log(data);
    };


  return (
    <section className='grid grid-cols-1 lg:grid-cols-12 relative pb-13'>
        <motion.div className='col-span-12 mt-20 m-3 lg:mx-30'>
            <h1 className='text-4xl text-primary text-center lg:text-5xl font-bold'>Contact Us.</h1>
            <p className='text-lg text-primary blue-400 mt-5 text-center'>
                We're here to help with all your logistics needs.
                Reach out to our team for  
                <motion.span className='italic text-3xl font-bold
                    bg-gradient-to-l from-green-600 to-green-800 bg-clip-text text-transparent'
                initial={{ 
                    x: -50,
                    opacity: 0,
                    scale: 0
                }}
                
                animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1.5
                }}
                transition={{
                    delay: 1,
                    type: "spring"
                }}> support, inquiries or partnership
                </motion.span> ,  opportunities.
            </p>
        </motion.div>

        

        <div className='mt-15 m-5 grid grid-cols-1 md:grid-cols-12 place-items-baseline md:gap-2
        lg:col-span-6 gap-3'>
            <div className='h-[200px] bg-gray-800 rounded-lg text-white  col-span-12 '>
                {/* icon/h5 container */}
                <div className='flex p-3 gap-3'>
                    <span className='rounded-full bg-blue-600/20 w-10 h-10 flex
                    text-blue-400 items-center justify-center'><LucideBuilding size={30}/></span>
                    <h5 className='text-2xl inline-flex items-center'>Address</h5>
                </div>
                <p className='mx-3 mt-4 text-gray-300'>
                    1234 Logistics Avenue Suite 500 New York, NY 10001
                </p>
            </div>

            <div className='h-[200px] bg-gray-800 rounded-lg text-white mt-4 col-span-12'>
                <div className='flex p-3 gap-3'>
                    <span className='rounded-full bg-blue-600/20 w-10 h-10 flex
                    text-blue-400 items-center justify-center'><LucidePhone/></span>
                    <h5 className='text-2xl inline-flex items-center'>phone</h5>
                </div>
                <p className='mx-3 mt-4 text-gray-300'>
                    Customer Support: <span className='text-blue-400'>(800) 123-4567</span>  Business Inquiries: <span className='text-blue-400'>(212) 555-1212</span>
                </p>
            </div>

            <div className='bg-gray-800 rounded-lg text-white py-6  col-span-12'>
                <div className='flex p-3 gap-3'>
                    <span className='rounded-full bg-blue-600/20 w-10 h-10 flex
                    text-blue-400 items-center justify-center'><LucideMail/></span>
                    <h5 className='text-2xl inline-flex items-center'>Email</h5>
                </div>
                
                <p className='mx-3 mt-4 text-gray-300'> 
                    Customer Service:  
                    <span className='text-blue-400 ms-2'>
                             globallogistick@email.com
                    </span>
                </p>
            </div>

            <div className='bg-gray-800 mt-1 rounded-lg p-6 col-span-12 w-full'>
                <h5 className='text-2xl text-white  font-bold '>Send Us a message</h5>
                <p className='text-gray-300 mt-2'>
                    Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form className='mt-5 '
                    onSubmit={handleSubmit(submitForm)}> 
                    <div>
                        <input type="text"
                        placeholder='Your Name'
                        className='border-1 p-2 rounded-lg w-full border-gray-300 text-white' />
                    </div>

                    <div>
                        <input type="email"
                        placeholder='Emaill Address'
                        className='border-1 p-2 rounded-lg w-full mt-4 border-gray-300 text-white'
                        />
                    </div>

                    <div>
                        <input type="text"
                        placeholder='Subject'
                        className='border-1 p-2 rounded-lg w-full mt-4 border-gray-300 text-white' />
                    </div>

                    <div>
                        <textarea name="your-message"
                        placeholder='Your Message'
                        
                        className='border-1 rounded-lg w-full mt-4 h-[130px] p-2 border-gray-300 text-white'>
                        </textarea>
                    </div>

                    <div>
                        <Button buttonName='Send Message'
                        onClickFunc={()=> submitForm}
                        className='bg-green-800 w-full mt-4 p-3 rounded-lg text-gray-100'/>
                    </div>
                </form>
            </div>
        </div>

        <div className='col-span-12 p-4 lg:col-span-6 lg:mt-15 items-start'>
            <MapView/> 
        </div>


        <div className='bg-gray-800 rounded-lg py-18 m-4 p-8 md:flex
         items-end text-white shadow-[2px_1px_10px_3px_gray] col-span-12'>
            <div className='flex-1'>
                <h5 className='text-2xl font-semibold'>New York Office</h5>
                 <br />
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Weekend: Closed</p>
            </div>

            <div className='flex-1 mt-5'>
                <h5 className='text-2xl font-semibold'>Los Angeles Office</h5>
                <br/>
                <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p>Weekend: Closed</p>
            </div>

            <div className='flex-1 mt-5 '>
                <h5 className='text-2xl font-semibold'>Miami Office</h5>
                <br/>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
            </div>
        </div>

        <div className='w-full col-span-12 p-2 rounded-lg relative'>
            <div className='relative'>
                <img src={landingPage} alt="landing-plane" 
                className='rounded-lg m-1 relative'
                />
            </div>
            
            <div className='absolute m-5 p-2 top-10 flex items-center'>
                <h1 className='text-3xl lg:text-5xl text-primary italic font-serif
                    opacity-60 text-center'>SureDrop <br />
                <span className='leading-5'>SureTrust</span>  </h1>
            </div>
        </div>
    </section>
  )
}

export default Map;
