import React from 'react';
import { useState } from 'react';
import { data } from './FaqsData';

const Faqs :React.FC = () => {

    // state to manage the accordion click
    const [activeIndex, setActiveIndex] = useState<null | number>(null);

    function toggleAccordion (index: number) {

        if (activeIndex === index) return setActiveIndex(null);
        else setActiveIndex(index);
    };

  return (
    <section className='bg-primary xl:px-20 py-15'>

        <div className='lg:text-4xl text-white text-center mb-6'>
            <h2>Frequently asked Questions</h2>
        </div>

        {
            data.map((item, index)=> (
                <div key={index} className=''>

                    {/* accordion header/title */}
                    <div
                        className="flex justify-between p-2 border-1 border-green-500
                        rounded m-2 cursor-pointer hover:bg-gray-500 transition-colors"
                        onClick={()=> toggleAccordion(index)}
                        >
                            {/* accordion title/questions  */}
                            <h5 className=' text-white font-bold'>{item.question}</h5>
                            <span className='text-green-200 text-lg font-bold'>{activeIndex === index ? "▲" : "▼"}</span>
                    </div>

                    {/* accordion content */}
                    {
                        activeIndex === index && (
                            <div className=' bg-cyan-800 text-white p-2 m-2 animate-FadeIn'>
                                {item.answer}
                            </div>
                        )
                    }
                </div>
            ))
        }
    </section>
  )
}

export default Faqs;
