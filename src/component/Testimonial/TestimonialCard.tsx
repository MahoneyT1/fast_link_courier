import React from 'react';
import { motion } from "motion/react";

interface Testimonial {
    name: string,
    role: string,
    quote: string,
    rating: number | string,
    color: string
  };

const TestimonialCard: React.FC<Testimonial> = ({quote, name, role, rating, color}) => {
  return (
    <motion.div
     whileHover={{scale: 1.02}}
     style={{
        height: "400px",
        width: "300px",
        maxHeight: "420px",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: `${color}`
     }}
     className='shadow-[1px_1px_2px_2px_gray] ' >
        <motion.div>
            <motion.div className='text-3xl text-green-500 
            text-gradient-to-r from-green-700 to-green-100
            '>❝</motion.div>
        </motion.div>
        
        <div className=" mb-3 h-15  flex justify-center object-cover">
            <img className='rounded-full' src={`https://i.pravatar.cc/100?u=${name}`} alt={name} />
        </div>

        <div className='flex flex-col text-center'>
            <div className='mt-4'>
                <p>{quote}</p>
            </div>

            <div className=' w-[290px]  mt-5 flex 
            flex-col items-end self-end px-5 '>
                <p className='text-blue-400 flex-e'>{name}</p>
                <p className='text-end'>{role}</p>
                <p className='text-green-600'>{rating}</p>
            </div>
                
        </div>
    </motion.div>
  )
}

export default TestimonialCard;
