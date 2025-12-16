import React from 'react';
import backgroundImage from "../../assets/HeroBackground.jpg";
import HeroSection from '../../component/HeroSection/HeroSection';
import Features from '../../component/Features/Features';
import ServiceSection from '../../component/ServiceSection/ServiceSection';
import ShippingCalculator from '../../component/ShippingCalculator';
import Testimonial from '../../component/Testimonial/Testimonial';
import CtaSection from '../../component/CTASection/CtaSection';
import Faqs from '../../component/FAQS/Faqs';
import "./Home.css"

const Home: React.FC = () => {
  return (
    <section className='w-full '>
      <div className='flex justify-center items-center relative '
        style={{
          backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover",
          backgroundPosition: "center", height: "100vh"
        }}>

        <HeroSection />
      </div>


      <div className=''>
        <ServiceSection />
      </div>

      <div className=''>
        <Features />
      </div>

      <div className='flex flex-col justify-center items-center '>
        <ShippingCalculator/>
      </div>

      <div className='w-full mt-10'>
        <Testimonial/>
      </div>

      <div className='w-full mt-10'>
        <CtaSection/>
      </div>

      <div className=' mt-10'>
        <Faqs/>
      </div>

      

    </section>

  )
};

export default Home;
