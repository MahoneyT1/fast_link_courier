/**
 * login page.
 */

import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Utils/AuthProvider';
// import { ReceiptRussianRuble } from 'lucide-react';
import { loginUser } from '../../services';
import { useEffect } from 'react';


interface LoginProps {
    email: string,
    password: string,
}


const Login: React.FC = () => {
    const auth = useAuth()

    // create a navigation object
    const navigator = useNavigate();

    // set up the form object
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<LoginProps>();

    useEffect(()=> {
        if (auth.user) {
            navigator('/', { replace: true });
        }
    })

    // function to handle login
    const handleLogin = async (formData: LoginProps) => {
        console.log("Attempting login with", formData)
        
        try {
            // make a post request with login details
            const response = await loginUser(
                formData.email,
                formData.password
            );

            if (response.user) {
                toast.success("Successfully logged in",
                    { onClose: ()=> {
                        // Verify backend state and then navigate so UI reflects true auth
                        console.log(response.user)
                        navigator('/', { replace: true });
                    },
                    autoClose: 2000
                });
            }   
        } catch (err: any) {
            toast.error("Invalid email or password", {
                autoClose: 2000
            });
            console.log(errors)
            reset();
        }
               
    }

    return (
        <section className='w-full p-3 md:px-30 md:p-10 lg:px-40 bg-primary min-h-screen'>

            <form onSubmit={handleSubmit(handleLogin)}
                className='bg-white rounded-2xl p-7 text-primary lg:mx-60'>

                <div className='w-full  text-center '>
                    <h4 className='text-3xl font-bold'>Courier Login</h4>
                </div>

                <div className='py-5 '>
                    <label htmlFor="email" id='email' className='w-full block font-bold' >Email</label>

                    <input type="email"
                        id='email'
                        {...register('email', { required: "Email is required for login" })}
                        className='border-1 rounded-lg w-full p-2 mt-1' />
                </div>
                {errors.email && <p className='text-red-500 '>{errors.email.message} </p>}

                <div>
                    <label htmlFor="password" id='password'
                        className='block w-full mt-2 font-bold'>Password</label>
                    <input
                        type="password"
                        id='password'
                        {...register('password', { required: "Password is required" })}
                        className='border-1 rounded-lg w-full p-2 mt-1' />
                </div>
                {errors.password &&
                    <p className='text-red-500 '>
                        {errors.password.message}
                    </p>
                }

                <div className='mt-7 w-full'>
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className='p-3 border bg-green-500
                        text-white rounded-lg w-full text-lg 
                        disabled:opacity-50 disabled:cursor-not-allowed'>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </div>

                <div className='mt-9 lg:text-center'>
                    <p className=''>Don't have an account?
                        <Link to='/register' className='text-blue-500'> Create one</Link> </p>

                    <p className=''>Forgotten Password ?
                        <Link to='/forgot-password' className='text-blue-500'> Reset password</Link> </p>
                </div>

            </form>

        </section>
    )
};

export default Login;