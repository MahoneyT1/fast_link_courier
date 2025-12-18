import React, { useState } from 'react'
import { Menu, X } from 'lucide-react';
import {  Link } from 'react-router-dom';
import Button from '../Button';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Utils/AuthProvider';
import 'react-toastify/dist/ReactToastify.css';
import { logoutUser } from '../../services';


const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
 
    const auth = useAuth();
    // make a request to authenticated route to be sure the user is logged in

  return (
    <header className='w-full bg-primary text-white text-bold-400'>
     

        <div className="mx-auto md:px-6 flex justify-between items-center ">
            {/* logo */}
              <div className="">
                  <svg width="56px" height="36px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 2V12C15 13.1 14.1 14 13 14H2V7.62C2.73 8.49 3.85003 9.03 5.09003 9C6.10003 8.98 7.01 8.59 7.69 7.94C8 7.68 8.26002 7.34999 8.46002 6.98999C8.82002 6.37999 9.02 5.65997 9 4.90997C8.97 3.73997 8.45001 2.71 7.64001 2H15Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M22 14V17C22 18.66 20.66 20 19 20H18C18 18.9 17.1 18 16 18C14.9 18 14 18.9 14 20H10C10 18.9 9.1 18 8 18C6.9 18 6 18.9 6 20H5C3.34 20 2 18.66 2 17V14H13C14.1 14 15 13.1 15 12V5H16.84C17.56 5 18.22 5.39001 18.58 6.01001L20.29 9H19C18.45 9 18 9.45 18 10V13C18 13.55 18.45 14 19 14H22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 6.2 8.47001 7.27 7.64001 8C6.93001 8.62 6.01 9 5 9C2.79 9 1 7.21 1 5C1 3.74 1.58 2.61 2.5 1.88C3.19 1.33 4.06 1 5 1C7.21 1 9 2.79 9 5Z" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M5.25 3.75V5.25L4 6" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" className="w-24 h-24 text-white [&_path]:stroke-current"
                        strokeLinejoin="round"></path> </g>
                    </svg>
              </div>
            
            {/* Destop Navigation */}
            <nav className='hidden md:flex space-x-6 items-center' aria-label='primary navigation'>
                <ul className='flex gap-5 text-lg hover:border-white-300'>
                    <li><Link className={`hover:text-gray-300 `} to="/">Home</Link></li>
                    <li ><Link className='hover:text-gray-300' to="/about">About</Link></li>
                    <li ><Link className='hover:text-gray-300' to="/contact">Contact</Link></li>
                    <li ><Link className='hover:text-yellow-300' to="/service">Service</Link></li>
                    <li ><Link className='hover:text-yellow-300' to="/profile">Profile</Link></li>
                    <li ><Link className='hover:text-yellow-300' to="/create-shipment">Send Package</Link></li>
                    <li ><Link className='hover:text-yellow-300' to="/track">Track</Link></li>
                    <li ><Link className='hover:text-yellow-300' to="/admin">Admin Page</Link></li>
                </ul>

                  {auth.user ? (
                      <Button buttonName='logout' className='bg-red-500 p-1 rounded font-bold'
                          onClickFunc={async () => logoutUser()} />
                  ) : (
                      <Button buttonName='login' className='bg-green-500 to-green-500 p-2 rounded font-bold'
                          linkUrl='/login' />
                  )}
            </nav>
            {/* Mobile Menu Button */}
            <button
                onClick={()=> setIsOpen(!isOpen)}
                className='md:hidden'
                aria-label='Toggle Menu'
                aria-controls='Mobile-menu'
                aria-expanded={isOpen}
                >
                    {isOpen ? <X size={28}/> : <Menu size={28}/>}
            </button>

             {/* Mobile navigation (hidden on default) */}
            {isOpen && (
                <nav id='mobile-menu' className='md:hidden  '>
                    <ul className='flex flex-col items-center p-4 gap-3'>
                        <li><Link className='hover:text-yellow-300 py-1 oncl' to="/">Home</Link></li>
                        <li><Link className='hover:text-yellow-300 py-1 ' to="/about">About</Link></li>
                        <li><Link className='hover:text-yellow-300 py-1 ' to="/contact">Contact</Link></li>
                        <li><Link className='hover:text-yellow-300 py-1 ' to="/service">Service</Link></li>
                        <li><Link className='hover:text-yellow-300 py-1 ' to="/profile">Profile</Link></li>
                        <li><Link className='hover:text-yellow-300 py-1 ' to="/create-shipment">Send Package</Link></li>
                        <li><Link className='hover:text-yellow-300 py-1 ' to="/track">Track</Link></li>
                        <li><Link className='hover:text-yellow-300 py-1 ' to="/admin">Admin Page</Link></li>

                        { auth.user ? (
                            <Button buttonName='logout' className='bg-red-500 p-1 rounded font-bold'
                                onClickFunc={async () => logoutUser()} />
                        ) : (
                            <Button buttonName='login' className='bg-green-500 to-green-500 p-2 rounded font-bold'
                                linkUrl='/login' />
                        )}
                    </ul>
                   
                </nav>
            )}
        </div>

       
    </header>
  )
}

export default Navbar;
