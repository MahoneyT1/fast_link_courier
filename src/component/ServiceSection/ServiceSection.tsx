import React from 'react';
import Card from '../Card/Card';
import "./ServiceSection.css";


const ServiceSection: React.FC = () => {
  // services for easy modification

  return (
    <section className='w-full mt-5'>
      <div className='mb-8'>
        <h4 className='text-center text-2xl font-semibold text-gray-700 
         md:text-4xl md:mt-10 lg:text-5xl lg:p-5 background-effect'
          >Our delivery services
        </h4>
      </div>

      <div className='grid grid-cols-1 justify-items-center gap-y-5 md:grid-cols-2 md:gap-5
         md:justify-items-center lg:grid-cols-3 xl:grid-cols-4 p-3'>
       
          <Card cardIcon={"fa-solid fa-truck bg-gradient-to-r from-primary\
            to-green-500 text-transparent bg-clip-text moving-fast-3d"}
            cardTitle='Domestic Shipping '
            cardBody='Fast and reliable shipping across the country.
                        Door-to-door delivery with tracking.'
            cardLink='Learn More'
            className='bg-white shadow-[1px_1px_20px_1px_gray]' />
     
          <Card cardIcon="fa-solid fa-globe bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text animate-rotate-x"
            cardTitle='International Shipping '
            cardBody='Global delivery solutions for business and individual
                        . Custom clearance included.'
            cardLink='Learn More'
            className='bg-white shadow-[1px_1px_20px_1px_gray]' />
      


          <Card cardIcon="fa-solid fa-bolt bg-gradient-to-r from-primary to-yellow-600 text-transparent bg-clip-text"
            cardTitle='Express delivery'
            cardBody='Urgent shipments delivered within hours. Guaranteed fastest
                        transit times.'
            cardLink='Learn More'
            className='bg-white shadow-[1px_1px_20px_1px_gray]' />
 


          <Card cardIcon="fa-solid fa-cube bg-gradient-to-r from-primary to-green-500 text-transparent bg-clip-text bounce"
            cardTitle='Freight Services'
            cardBody='Large-scale shipping for commercial, industrail and individaul needs.
                        Full container and partial load options.'
            cardLink='Learn More'
            className='bg-white shadow-[1px_1px_20px_1px_gray]' />
  

   
          <Card cardIcon="fa-solid fa-magnifying-glass bg-gradient-to-r from-primary to-green-500 text-transparent bg-clip-text zoom-in"
            cardTitle='Real-Time Tracking'
            cardBody="Monitor your shipment's journey from pickup to delivery. 
                      instant updates and notifications."
            cardLink='Learn More'
            className='bg-white shadow-[1px_1px_20px_1px_gray]' />
 
      </div>
      

    </section>
  )
}

export default ServiceSection;
