/**
 * Register user component UI, handles user creation by making an api(backend create user )
 * 
 *
 */

import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { User, Mail, PhoneCallIcon, LockIcon } from "lucide-react";
import { zodResolver }from '@hookform/resolvers/zod'
import * as z from "zod";
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../services';


// create a blueprint for the form data
const FormSchema = z.object({
    full_name: z.string().min(1, "Full name is required"),
    email: z.string().email({ message: "Invalid email address"}),
    username: z.string().min(1, "Name is required"),
    phone_number: z.string().min(10, "Phone number is too short").max(12, "Phone number is too long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirm_password: z.string()
})
.refine((data)=> data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"]
});

// copy the zod schema interface
type FormType = z.infer<typeof FormSchema>

// Register UI
const Register: React.FC =() => {
    // set up the form object
    const navigate = useNavigate();
    const { 
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormType>({ resolver: zodResolver(FormSchema)});

    // handle onSubmit function
    const handleSub = async (data: FormType) => {
        // send a post request with user new data

        try {
          const response = await registerUser(
            data.email,
            data.password,
            data.phone_number,
            data.username,
            data.full_name
          )

          if (response.user) {
            // throw or alert the user of a success
            toast.success("Successfully created user", {
              // navigate back to login page after 2 seconds
              onClose: () => navigate('/login'),
              autoClose: 2000})
          }
        } catch (error) {
          toast.error("Error creating user. Please try again.");
          console.error("Registration error:", error);
        }
      }

  return (
    <section className="w-full bg-primary min-h-screen 
        grid grid-cols-1 md:grid-cols-12 lg:p-9 md:items-center">

      <div className='col-span-12'>
        <ToastContainer />
      </div>

        <motion.div
        initial={{
            y: 0,
        }}
        animate={{
            y: -250,
        }}
        transition={{
            repeat: Infinity,
            duration: 4,
            delay: 2,
            repeatType: "reverse",
            ease: "easeInOut",
        }}
        className='m-3 p-3 text-center md:col-span-6 relative'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-green-400 via-green-100 to-green-600 bg-clip-text text-transparent'>Welcome to FaskLink Express</h1>
            <p className='mt-7 text-lg text-center text-white'>Join thousands who trust us for fast, 
                secure, and reliable deliveries. Create an account to track your orders in real-time,
                get exclusive discounts, and enjoy a seamless delivery experience tailored just for you.
            </p>
        </motion.div>

          <form onSubmit={handleSubmit(handleSub)} className='bg-white m-4 p-7 rounded col-span-6 flex 
            flex-col justify-center shadow-[1px_1px_15px_1px_green]'>
            <div className='w-full'>
                <label htmlFor="fullNameInput" id='fullName' className='text-primary'>Full name</label>

                  <div className='border border-gray-400 my-2 rounded flex items-center
                    px-2 p-3 space-x-3'>
                    <User className='inline-flex justify-center text-primary'/>
                    <input 
                        type="text"
                        id='fullNameInput'
                        {...register('full_name', { required: "Full name is required",  })}
                     className='relative w-full'
                     placeholder='John Doe'
                     autoComplete='additional-name webauthn'
                     />
                </div>
            </div>
              {errors.full_name && <p className='text-red-500 '>{errors.full_name.message} </p>}

            <div className=''>
                <label htmlFor="emailInput" id='email' className='text-primary'>Email</label>

                  <div className='border border-gray-400 my-2 rounded flex items-center
                    px-2 p-3 space-x-3'>
                    <Mail className='inline-flex ' />
                    <input 
                        type="email"
                        autoComplete='additional-name webauthn'
                        id='emailInput'
                        {...register('email', { required: "Email is required"})}
                        placeholder='John Doe'
                        className='relative w-full '
                        />
                </div>
            </div>
              {errors.email && <p className='text-red-500 '>{errors.email.message} </p>}

              <div className=''>
                  <label htmlFor="phoneNumberInput"
                  className='text-primary'>Phone number</label>

                  <div className='border border-gray-400 my-2 rounded flex items-center
                    px-2 p-3 space-x-3'>
                      <PhoneCallIcon className='inline-flex  ' />
                      <input type="tel"
                      id='phoneNumberInput'
                      {...register('phone_number', { required: "Phone number is required", })}
                      placeholder='+1 (222) 456 446'
                      className='relative' />
                  </div>
              </div>
              {errors.phone_number && <p className='text-red-500 '>{errors.phone_number.message} </p>}


              <div className=''>
                  <label htmlFor="usernameInput" className='text-primary'>Username</label>

                  <div className='border border-gray-400 my-2 rounded flex items-center
                    px-2 p-3 space-x-3'>
                      <LockIcon className='inline-flex  ' />
                      <input type="text"
                          id='usernameInput'
                          {...register('username', { required: " Username is required" })}
                          className='relative w-full'
                          placeholder='username' />
                  </div>
              </div>
              {errors.username && <p className='text-red-500 '>{errors.username.message} </p>}
              
              <div className=''>
                  <label htmlFor="passwordInput"
                    id='password'
                    className='text-primary'>Password</label>

                  <div className='border border-gray-400 my-2 rounded flex items-center
                    px-2 p-3 space-x-3'>
                      <LockIcon className='inline-flex  ' />
                      <input type="password"
                        id='passwordInput'
                        {...register('password', { required: "password is required"})}
                        className='relative w-full' />
                  </div>
              </div>
              {errors.password && <p className='text-red-500 '>{errors.password.message} </p>}

              <div className=''>
                  <label htmlFor="confirmPasswordInput" id='confirm-password' className='text-primary'>Confirm Password</label>

                  <div className='border border-gray-400 my-2 rounded flex items-center
                    px-2 p-3 space-x-3'>
                      <LockIcon className='inline-flex  ' />
                      <input type="password"
                        id='confirmPasswordInput'
                        {...register('confirm_password', { required: "Confirm Password is required"})}
                        className='relative w-full' />
                  </div>
              </div>
              {errors.confirm_password && <p className='text-red-500 '>{errors.confirm_password.message} </p>}
              
              <button type='submit'
          className='bg-green-500 p-2 mt-5 rounded w-full active:scale-95  text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
                disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create Account"}
              </button>
        </form>
    </section>
  )
}

export default Register;
