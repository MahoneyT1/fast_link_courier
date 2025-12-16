import React from 'react';
import { useState } from 'react';

const ShippingCalculator: React.FC = () => {
    //input state management
    const [weight, setWeight] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState('');
    const [destination, setDestination] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [active, setActive] = useState(false);

    const calculateShippingRate = ()=> {

        // reset the error error log and price output
        setError("");
        setPrice(null);
        setActive(!active);

        // validate the inputs
        const weightNum = parseFloat(weight);
        const lengthNum = parseFloat(length);
        const widthNum = parseFloat(width);
        const heightNum = parseFloat(height);

        if (isNaN(weightNum) || widthNum <= 0) {
            setError('Please enter a valid weight');
            return;
        }

        if (isNaN(lengthNum) || isNaN(widthNum) || isNaN(heightNum) || 
            lengthNum <= 0 || widthNum <= 0 || heightNum <= 0 ) {
                setError('Please enter a valid package dimensions');
                return;
        };
        
        // Basic pricing algorithm
        const baseRate = destination === 'domestic' ? 500 : 1000;
        const weightRate = weightNum * 2;
        const volumeRate = (lengthNum * widthNum * heightNum)/1000 * 0.5;

        const totalPrice = baseRate + weightRate + volumeRate;

        setPrice(Math.max(10, Math.round(totalPrice * 100) / 100))
    };

  return (
    <section className='w-[283px] md:w-[650px] lg:w-[750px] mt-20 p-4 my-13 bg-white shadow-[0px_2px_2px_1px_gray] rounded-2xl'>
        <div className='text-center'>
            <h6 className='text-2xl font-semibold text-primary'>Shipping Rate Calculator</h6>
        </div>

        <div className='grid grid-cols-1  mt-5'>
            <label htmlFor="weight" className='font-semibold'>Weight (kg)</label>
            <input id='weight'
                type="number"
                placeholder='Enter package weight'
                onChange={(e)=> setWeight(e.target.value)}
                className='border-2  border-gray-400 rounded mt-1 p-2'
            />
        </div>

        <div className='grid grid-cols-3 gap-2 mt-3'>
            <div className=' '>
                <label htmlFor="length" className='font-semibold'>Length(cm)</label>
                <input id='length' type="number" placeholder='Length' 
                onChange={(e)=> setLength(e.target.value)}
                className='border-2 border-gray-400  rounded w-full text-center' />
            </div>

            <div className=''>
                <label htmlFor="width" className='font-semibold'>Width(cm)</label>
                <input type="number" placeholder='Width' id='width'
                onChange={(e)=> setWidth(e.target.value)}
                className='border-2 border-gray-400 w-full rounded  text-center' />
            </div>

            <div className=''>
                <label htmlFor="height" className='font-semibold'>Height(cm)</label>
                <input type="number" placeholder='Height' id='height'
                onChange={(e)=> setHeight(e.target.value)}
                className='border-2 border-gray-400 w-full rounded text-center' />
            </div>
            </div>

        <div className='col-span-3 mt-5'>
                <label htmlFor="dom-inter" className='font-semibold'>Domestic</label>
                <select name="dom-inter"
                 id="dom-inter"
                 className='border-2 border-gray-300 w-full rounded p-2 text-gray-500'
                 onChange={(e)=> setDestination(e.target.value)}
                 >
                 
                 <option value="domestic">Domestic</option>
                 <option value="international">International</option>

                 </select>
            </div>
        <button
            onClick={calculateShippingRate}
            className='grid grid-cols-1 w-full border-2 mt-4 rounded p-3
            border-gray-400 bg-gradient-to-r from-green-700
            to-green-400 text-white shadow-md active:shadow-inner transition-all duration-100'
            
        >
                Calculate Shipping Rate
        </button>

        {error && (
            <div className='text-red-400'>
                {error}
            </div>
        )}

        {price && (
            <div className='text-white p-1 mt-2 bg-primary'>
                Estimated shipping cost : <strong className='text-green-500'>${price.toFixed(2)}</strong>
            </div>
        )}


    </section>
  )
}

export default ShippingCalculator;
