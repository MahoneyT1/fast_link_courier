import React from 'react';
import { cardPropData } from './TrackData';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPackage } from '../../services';


interface TrackForm {
  id: string,
};


const Track: React.FC = ()=> {

  // instance of useNavigate
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<TrackForm>();

  //handle the obtained data from the form
  const handleTrack = async (data: { id: string }) => {
    // extract id from the form

    const { id } = data;
      try { 
        const packageData = await getPackage(id)
        navigate(`/package-details`, { state: {package: packageData }});

      } catch( err: any) {
        toast.error(err);
      }
    }

  return (
   <section className='text-center w-full min-h-[100vh] bg-white py-20'>

        <span className=' text-white text-sm md:text-lg bg-primary rounded-2xl px-4'>
          <i className="fa-solid fa-location-dot m-2"></i>
          Global-logistick Package Tracking
        </span>

        <div className='md:px-15'>
          <h1 className='text-green-700  text-4xl lg:text-5xl font-bold text-center mt-9 '>Track Your Package.</h1>

          <p className='text-center text-primary text-lg mx-5 mt-5 md:mt-8'>
              Enter your tracking number to get real-time updates on your
              shipment's location and status.
          </p>
        </div>

        <form className='text-gray-400 mt-7 grid grid-cols-12 mx-5 items-center 
          gap-2 rounded shadow-[1px_3px_17px_1px_green] bg-primary
           backdrop-blur-xl md:h-[80px] lg:mx-20' onSubmit={handleSubmit(handleTrack)}>

            <div className='col-span-7 inline-flex rounded gap-3'>
              <i className="fa-solid fa-cube relative ms-3 col-span-1 text-2xl p-2 rounded md:ms-0 "></i>
              <input
               type="text"
               { ...register('id')} 
               placeholder='Enter Tracking number'
               className='w-full p-3 rounded font-bold'/>
            </div>
            { errors.id && (<p className='text-red-500'>{errors.id.message}</p>  )}

            <div className='inline-flex text-white items-center col-span-5 
              justify-center bg-gradient-to-r 
              rounded active:scale-95 md:me-3'>

              <button
                type='submit'
                className='text-lg flex flex-end from-green-700 to-green-400
                rounded active:scale-95'> 
                <i className="fa-solid fa-magnifying-glass items-center"></i>
              </button>

            </div> 
        </form>

        <div className=' mt-30 grid grid-cols-1 m-8 rounded-xl gap-5 md:grid-cols-3
          lg:px-25 xl:px-40'>

          {cardPropData.map((item, index)=> (
            <div key={index} className=' rounded-xl py-5 
              shadow-[1px_3px_17px_1px_gray] hover:scale-105 
              transition-all duration-300 cursor-pointer'>
              <div className='text-green-800 text-start p-2'>
                <span className=' rounded-full text-2xl '>
                  <i className={item.icon}></i>
                </span>
              </div>

              <div className='w-full '>
                <h1 className='text-primary text-2xl font-semibold text-start m-2'>
                  {item.title}</h1>
                  <p className='text-gray-600 text-md mt-5 text-start m-2'>{item.body}</p>
              </div>

            </div>
          ))}
        </div>
                    
   </section>
  )
}

export default Track;
