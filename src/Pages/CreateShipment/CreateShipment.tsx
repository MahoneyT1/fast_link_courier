import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../Utils/AuthProvider';
import { submitPackage } from '../../services';
import { useForm } from 'react-hook-form';
import { MapPin, Package } from 'lucide-react';


type FormType = {
    recipient_name: string;
    recipient_phone_number: string;
    recipient_address: string;
    description: string;
    height: number;
    weight: number;
    length: number;
    width: number;
    pickup_date: string;
    delivery_type: string;
};

const CreateShipment: React.FC = () => {
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const auth = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormType>();

    const onSubmit = async (data: FormType) => {
        if (!user) {
            toast.error('You must be logged in');
            return;
        }

        const payload: any = {
            ...data,
            userId: auth?.user?.uid,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        try {
            await submitPackage(payload);
            toast.success('Package created successfully');
            reset();
            setStep(1);
        } catch (error) {
            console.error(error);
            toast.error('Failed to create package');
        }
    };

    return (
        <section className="w-full min-h-screen bg-primary py-10">
            <div className="p-5">
                <h1 className="text-green-500 text-4xl text-center font-bold xl:text-5xl">
                    Ship Your Package
                </h1>

                <p className="text-white mt-5 text-lg mx-auto max-w-2xl text-center">
                    Enter your shipment details and we'll handle the rest.
                </p>
            </div>

            <div className="md:px-7 lg:px-35 xl:px-60">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white mx-6 md:mx-25 lg:mx-30 rounded-lg
          py-10 shadow-[0px_1px_11px_1px_green] transition-all duration-300 ease-in-out"
                >
                    {/* STEP 1 */}
                    {step === 1 && (
                        <div className="p-5">
                            <h2 className="text-2xl inline-flex gap-3 items-center font-semibold text-primary">
                                <MapPin size={25} className="text-green-600" />
                                Recipient Information
                            </h2>

                            <input
                                {...register('recipient_name', { required: 'Required' })}
                                placeholder="Recipient's Name"
                                className="border-1 p-2 rounded w-full m-1 mt-7 border-green-500 text-gray-600"
                            />
                            {errors.recipient_name && (
                                <p className="text-red-500">{errors.recipient_name.message}</p>
                            )}

                            <input
                                {...register('recipient_address', { required: 'Required' })}
                                placeholder="Address"
                                className="border-1 p-2 rounded w-full m-1 mt-7 border-green-500 text-gray-600"
                            />
                            {errors.recipient_address && (
                                <p className="text-red-500">{errors.recipient_address.message}</p>
                            )}

                            <input
                                {...register('recipient_phone_number', { required: 'Required' })}
                                placeholder="Phone number"
                                className="border-1 p-2 rounded w-full m-1 mt-7 border-green-500 text-gray-600"
                            />
                            {errors.recipient_phone_number && (
                                <p className="text-red-500">
                                    {errors.recipient_phone_number.message}
                                </p>
                            )}
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <div className="p-5">
                            <h2 className="text-2xl inline-flex gap-3 items-center font-semibold text-primary">
                                <Package size={25} />
                                Package Details
                            </h2>

                            <input
                                {...register('height', { required: 'Required' })}
                                placeholder="Height"
                                className="border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full"
                            />
                            {errors.height && <p className="text-red-500">{errors.height.message}</p>}

                            <input
                                {...register('weight', { required: 'Required' })}
                                placeholder="Weight"
                                className="border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full"
                            />
                            {errors.weight && <p className="text-red-500">{errors.weight.message}</p>}

                            <input
                                {...register('length', { required: 'Required' })}
                                placeholder="Length"
                                className="border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full"
                            />
                            {errors.length && <p className="text-red-500">{errors.length.message}</p>}

                            <input
                                {...register('width', { required: 'Required' })}
                                placeholder="Width"
                                className="border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full"
                            />
                            {errors.width && <p className="text-red-500">{errors.width.message}</p>}

                            <input
                                {...register('description')}
                                placeholder="Description"
                                className="border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full"
                            />

                            <input
                                type="date"
                                {...register('pickup_date', { required: 'Required' })}
                                className="border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full"
                            />
                            {errors.pickup_date && (
                                <p className="text-red-500">{errors.pickup_date.message}</p>
                            )}

                            <select
                                {...register('delivery_type', { required: 'Required' })}
                                className="border-1 p-2 rounded m-1 mt-7 border-green-500 text-gray-600 w-full"
                            >
                                <option value="domestic">Domestic</option>
                                <option value="international">International</option>
                            </select>
                        </div>
                    )}

                    {/* BUTTONS */}
                    <div className="w-full p-2 flex justify-evenly">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="bg-primary p-2 rounded text-white"
                            >
                                Previous
                            </button>
                        )}

                        {step < 2 ? (
                            <button
                                type="button"
                                onClick={() => setStep(step + 1)}
                                className="bg-green-500 p-2 rounded text-white"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-green-600 p-2 rounded text-white disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CreateShipment;
