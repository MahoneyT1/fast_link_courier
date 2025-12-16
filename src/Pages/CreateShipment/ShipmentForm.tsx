import { div, form } from 'motion/react-client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, MapPin, Package } from 'lucide-react';
import Button from '../../component/Button';
import { toast } from 'react-toastify';



interface FormProps {
    onSubmit: (data: any)=> void
};

type FormType = {
    recipient_name: string;
    recipient_address: string;
    recipient_phone_number: string;
    description: string;
    pickup_date: string;
    weight: number;
    height: number;
    length: number;
    width: number;
    delivery_type: string;

};

const ShipmentForm: React.FC<FormProps> = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const { register, handleSubmit, formState:{ errors, isLoading , isSubmitting }} = useForm<FormType>();

    // set form state
    const [step, setStep] = useState(1);
    const handleSubmitForm = (data: FormType)=> {
        onSubmit(data);
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-white mx-6 md:mx-25 lg:mx-30 rounded-lg
    py-10 shadow-[0px_1px_11px_1px_green] transition-all 3s duration-300 ease-in-out'>

        { step === 1 && (
            <div className='p-5'>
                <h2 className='text-2xl inline-flex gap-3 items-center font-semibold text-primary'>
                    <MapPin size={25} className='text-green-600' />
                    Recipient Information
                </h2>
        
                <div className='text-gray-900 w-full'>
                    <input type="text"
                    placeholder="Recipient's Name"
                    { ...register('recipient_name')}
                    className='border-1 p-2 rounded w-full m-1 mt-7 border-green-500 text-gray-600' />
                    {errors.recipient_name && ( <p className="text-red-500">{errors.recipient_name.message}</p>)}

                    <input type="text"
                    placeholder='Address'
                    { ...register('recipient_address') }
                    className='border-1 p-2 rounded w-full m-1 mt-7 border-green-500 text-gray-600' />
                    {errors.recipient_address && (<p className="text-red-500">{ 
                    errors.recipient_address.message}</p>
                    )}

                    <input type="tel"
                    placeholder="phone number"
                    { ...register('recipient_phone_number') }
                    className='border-1 p-2 rounded w-full m-1 mt-7 border-green-500 text-gray-600'
                    />
                    {errors.recipient_phone_number && (
                        <p className="text-red-500">{errors.recipient_phone_number.message}</p>)}
                </div>
               
            </div>
        )}

        { step === 2 && (
            <div className='p-5'>
                <h2 className='text-2xl inline-flex gap-3 items-center font-semibold text-white'>
                    <Package size={25} className=''  />
                    Package Details
                </h2>
        
                <div className=''>
                   <input {...register('height')}
                        placeholder='Height'
                        className='border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full block'>
                        {errors.height && (
                              <p className="text-red-500">{errors.height.message}</p>)}
                   </input>

                    <input {...register('weight')}
                        placeholder='Weight'
                        className='border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full block'>
                    </input>
                    {errors.weight && (
                        <p className="text-red-500">{errors.weight.message}</p>)}

                    <input {...register('length')}
                        placeholder='Length'
                        className='border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full block'>
                    </input>
                      {errors.length && (
                          <p className="text-red-500">{errors.length.message}</p>)}

                    <input {...register('width')}
                        placeholder='width'
                        className='border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full block'>
                    </input>
                      {errors.width && (
                          <p className="text-red-500">{errors.width.message}</p>)}

                    <input {...register('description')}
                        placeholder='description'
                        className='border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full block'>
                    </input>
                      {errors.description && (
                          <p className="text-red-500">{errors.description.message}</p>)}

                <div className='mt-7 ps-2 font-bold text-gray-600'><label htmlFor="pick_update" id='pick_update' >pick update</label></div>
                   <input type="date"
                    {...register('pickup_date')}
                    className='border-1 p-2 rounded m-1  border-green-500 text-gray-600 w-full '
                    />
                      {errors.pickup_date && (
                          <p className="text-red-500">{errors.pickup_date.message}</p>)}
                </div>

                <div className='mt-3 ps-2  text-gray-600'>
                    <label htmlFor="deliver_type" id='delivery_type'
                    className='font-bold'>Deliver Type</label>
                      <select id='delivery_type' {...register('delivery_type')} className='border-1 p-2 rounded 
                      mt-2 border-green-500 text-gray-600 w-full block'>
                        <option value='domestic'>Dometic</option>
                        <option value='international'>International</option>
                    </select>
                    {errors.delivery_type && (<p className="text-red-500">{errors.delivery_type.message}</p>)}
                </div>
            
            </div>
        )}

        <div className='w-full p-2 flex justify-evenly'>
            {
                // if step is greater than 1 reduce step by 1 (for prev select)
                step > 1 && (
                    <Button buttonName='Previous'
                    onClickFunc={()=> setStep(step - 1 )}
                    className='bg-primary p-2 rounded
                     text-white text-semibold'/>
                )
            }

            {
                // if step is less than 3 render this button
                // click next to move to the final form inputs
                step < 2 ? (
                    <Button buttonName='Next' onClickFunc={()=> setStep(step + 1)}
                    className='bg-green-500
                    p-2 rounded text-white text-semibold'/>
                )
                :
                (
                    <Button buttonName='Submit' onClickFunc={handleSubmit(handleSubmitForm)}
                    className={`bg-green-600
                    p-2 rounded text-white text-semibold ${isSubmitting
                         ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-blue-500 hover:bg-blue-600" }`}/>
                )
            }
        </div>
    </form>
  )
}

export default ShipmentForm;
