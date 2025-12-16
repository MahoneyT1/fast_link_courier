import React from 'react';
import { quickLinksData, socialsData } from './FooterLinks';

// footer UI
const Footer:React.FC = () => {
    //
  return (
    <footer className='bg-primary '>
        <div className='w-full flex flex-col justify-center lg:flex-row
            my-12  text-white '>

            <div className='p-5 lg:flex-1 text-center mt-4 py-4 lg:items-start'>
                <h4 className='my-5 border-b-2 border-green-500 text-lg font-bold '>About Us</h4>
                <p>We are a global logistics company dedicated to
                    providing seamless, efficient, and reliable shipping
                    solutions for businesses and individuals around the
                    world.
                </p>
            </div>

            <div className='p-5 lg:flex-1 lg:max-w-sm text-center mt-4 '>
                <h4 className='my-4 border-b-2 border-green-500 text-lg font-bold'> Quick Links</h4>
                {
                    quickLinksData.map((eachLink, index)=> (
                        <a key={index} className='block p-2 hover:text-secondary text-lg' href={eachLink.url}>
                            {eachLink.name}
                        </a>
                    ))
                }
            </div>

            <div className='p-5 lg:flex-1 text-center mt-4 text-white'>
                <h4 className='my-4 border-b-2 border-green-500 text-lg font-bold'>Connect with Us</h4>
                {
                    socialsData.map((item, index)=> (
                        <a key={index} href={item.url}
                            target='_blank'
                            title={item.name}
                            rel="noopener noreferrer"
                            className='p-5'>
                            <i className={`${item.icon} flex m-3 text-3xl cursor-pointer`}></i>
                        </a>
                    ))
                }
            </div>
        </div>

        <div className='my-4 border-t border-green-500 text-center
             text-white pb-15 '>
                <p className='mt-5'>© {new Date().getFullYear()} Courier Logistics. All Rights Reserved.</p>
                <p>Terms & Conditions Privacy Policy</p>
            </div>

    </footer>
  )
}

export default Footer;
