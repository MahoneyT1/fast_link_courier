import React from 'react';
import TestimonialCard from './TestimonialCard';

const Testimonial:React.FC = () => {

  const testimonials = [
    {
      name: "Sarah Johnson", role: "CTO, Global Tech Solutions",
      quote: "Incredible shipping service! Our critical tech components always arrive precisely when needed.",
      rating: 5, color: "#e8f4f8"
    },

    {
      name: "Michael Chen", role: "Founder, E-commerce Innovations",
      quote: "Real-time tracking transformed our customer communication. Absolutely game-changing logistics.",
      rating: 5, color: "#f0f4e6"
    },
    {
      name: "Elena Rodriguez",
      role: " Creative Director, Artisan Crafts International",
      quote: "As a small business, finding a reliable shipping partner was crucial. They've exceeded every expectation.",
      rating: 4, color: "#f4e8f0"
    },
    {
      name: "David Kim",
      role: "Operations Manager, Startup Logistics",
      quote: "Competitive pricing meets exceptional service. Our shipping costs dropped while reliability skyrocketed.",
      rating: 5, color: "#e6f0f4"
    }
  ];

  function renderRating (rating: number) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section 
      className='
        w-full pb-5 bg-primary grid grid-cols-1 justify-items-center
         md:grid-cols-12'>
      <div className='col-span-12 p-5'>
        <h5 className='text-3xl text-center mb-4 text-white lg:text-5xl'>See what our customers are saying</h5>
      </div>
    
      <div className='col-span-12 md:col-span-12  md:grid md:grid-cols-2 w-full grid-cols-1
      md:place-items-center lg:grid-cols-3 xl:grid-cols-4'>
        {testimonials.map((item, index)=> (
              <div key={index} className='place-items-center text-primary w-full mt-5 md:place-items-center' 
                style={{ fontFamily: "Times New Roman", fontSize: "17.6",
                fontStyle: "italic", boxShadow: "2px 3px 5px 2px dark", borderRadius: "5px", opacity: "0.7"}}>
                <TestimonialCard key={index} {...item } {...(item.rating ? { rating: renderRating(item.rating)} :{})} />
              </div>
            ))}
      </div>
    </section>
  )
};
export default Testimonial;
