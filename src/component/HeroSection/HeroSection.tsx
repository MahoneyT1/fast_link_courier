import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import "./HeroSection.css";
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../../Utils/AxiosInstance';
import 'react-toastify/dist/ReactToastify.css';


interface TrackInput {
  track: string
};


const HeroSection: React.FC = () => {

  const { register, handleSubmit, reset, 
    formState: { errors, isSubmitting }} = useForm<TrackInput>();

  const navigate = useNavigate();

  async function handleTrack (getInput: TrackInput) {

    // call api for tracking 
    const url = 'packages/';

    const { track } = getInput;
      try { 
        const response = await axiosInstance.get(
          `${url}${track}/`, { withCredentials: true });

        const packageData = await response.data;
        navigate(`/package-details`, { state: { package: packageData }});

      } catch( err: any) {
        toast.error(err);
      }
    }

  return (
      <section className='text-2xl w-[350px]
        h-[50vh] flex flex-col items-center justify-center text-center relative
        md:w-[600px] lg:w-[900px] xl:md-[76vw]'>
        <h1 className='text-white font-Inter backdrop-blur
          text-drive-from-left lg:text-5xl'>
            Reliable, Fask-Link – Delivering Services. <br />
            Delivering with Care, Every Time !!
        </h1>

      {/* <h6 className=' text-2xl text-white backdrop-blur-2xl
            text-drive-from-right lg:text-4xl '>Track your parcel/Package here
      </h6> */}
        <div className='mt-9 py-3'>

         
          <form onSubmit={handleSubmit(handleTrack)}
              className='flex flex-col justify-center items-center gap-2 '>
              <input 
                {...register('track', { required: "Tracking id is required" })}
                  className='bg-white rounded-lg text-sm w-[300px] 
                    ps-4 py-0 text-black relative md:w-[400px]
                    lg:p-5 '
                  name="track" type="text" placeholder='Tracking no. (  46fb9026-3623-406e-*******)'
                />
                { errors?.track && ( <p className='text-red-100 bg-red-900 rounded transparent px-3'>
                    <span className='text-sm font-size-sm fs-itallic'> 
                      {errors?.track?.message} </span>  </p>  
                  )
                }
              <button
                type='submit'
                disabled={ isSubmitting }
                onClick={()=> reset()}
            className='bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                  {isSubmitting ? 'Tracking...' : 'Track'}  
                </button>
          </form>
        </div>
      </section>
  )
}

export default HeroSection;
