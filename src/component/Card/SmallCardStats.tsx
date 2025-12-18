import React, { useEffect, useState } from 'react';
import { useMotionValue, useTransform, animate } from "framer-motion";

interface StatsProps {
  icon : string,
  body: string,
  value?: number,
  duration?: number,
  character?: string
};


const SmallCardStats:React.FC<StatsProps> = ({icon, body, character,  value=parseInt("56000"), duration =2 })=> {

  // set counter
  const count = useMotionValue(0);
  const rounded = useTransform(count, iterItem => Math.floor(iterItem).toLocaleString()); 

  // save the correct value in state
  const [displayValue, setDisplayValue ] = useState("0");

  useEffect(()=> {

    const constrol = animate(count, value, { duration })

    const unSubscribe = rounded.on('change', (v)=> {
      setDisplayValue(v);
    })

    return ()=> {
      constrol.stop
      unSubscribe();
    }
  }), [count, value, duration, rounded];
  
  return (
    <div className='shadow-lg rounded-2xl p-4 '>
        {/* icon div */}
        <div>
            <i className={icon}></i>
        </div>

        {/* title div */}
        <div className='text-4xl font-bold mt-4 p-0  text-center'>
          <h1 className='text-primary'>{displayValue}{character}</h1>

        </div>

        {/* body div */}
        <div className='mt-2'>
            <p className='text-primary'>{body}</p>
        </div>
    </div>
  )
}

export default SmallCardStats;
