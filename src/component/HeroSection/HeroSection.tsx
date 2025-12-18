import React from 'react';
import "./HeroSection.css";
import 'react-toastify/dist/ReactToastify.css';


const HeroSection: React.FC = () => {


  return (
      <section className='text-2xl w-[350px]
        h-[50vh] flex flex-col items-center justify-center text-center relative
        md:w-[600px] lg:w-[900px] xl:md-[76vw]'>
        <h1 className='text-white font-Inter backdrop-blur
          text-drive-from-left lg:text-5xl'>
            Global-logistick – Delivering Services. <br />
            Delivery with Care !!
        </h1>

      {/* <h6 className=' text-2xl text-white backdrop-blur-2xl
            text-drive-from-right lg:text-4xl '>Track your parcel/Package here
      </h6> */}
        
      </section>
  )
}

export default HeroSection;
