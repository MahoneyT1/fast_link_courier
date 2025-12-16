import React from 'react';
import Card from '../Card/Card';
import "./Features.css"

const Features: React.FC = () => {
    return (
        <section className='w-full mt-10 py-10 p-4 '>
            <div className="">
                <h3 className='text-center text-2xl font-semibold text-gray-700 lg:text-5xl text-drive-from-left'> Why Choose Our Shipping Service?
                </h3>
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-y-5 mt-8 
                md:grid-cols-2  place-items-stretch lg:grid-cols-3 xl:grid-cols-4 
                md:gap-5">

                <Card cardIcon='fa-solid fa-gauge-high bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text'
                    cardTitle='Ultra-Fast Delivery'
                    cardBody='Guaranteed next-day shipping for most destinations'
                    className='bg-white shadow-[1px_1px_20px_1px_gray]'
                />



                <Card cardIcon='fa-solid fa-lock bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text'
                    cardTitle='Real-Time Tracking'
                    cardBody="Follow your package's journey with precision GPS tracking"
                    className='bg-white shadow-[1px_1px_20px_1px_gray]'
                />


                <Card cardIcon='fa-solid fa-location-dot bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text'
                    cardTitle='Secure Handling'
                    cardBody='Advanced security protocols protect your valuable shipments'
                    className='bg-white shadow-[1px_1px_20px_1px_gray]'
                />



                <Card cardIcon='fa-solid fa-globe bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text'
                    cardTitle='Global Reach'
                    cardBody='Shipping to over 200 countries worldwide'
                    className='bg-white shadow-[1px_1px_20px_1px_gray]'
                />



                <Card cardIcon='fa-solid fa-thumbs-up bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text'
                    cardTitle='Guaranteed Reliability'
                    cardBody='99.9% on-time delivery success rate'
                    className='bg-white shadow-[1px_1px_20px_1px_gray]'
                />



                <Card cardIcon='fa-solid fa-sack-dollar bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text'
                    cardTitle='Competitive Pricing'
                    cardBody='Best rates without compromising service quality'
                    className='bg-white shadow-[1px_1px_20px_1px_gray]'
                />
            </div>
        </section>
    )
}

export default Features;
