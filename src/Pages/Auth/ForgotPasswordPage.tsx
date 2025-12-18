import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../../Utils/AuthProvider";



const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const auth = useAuth();

    const handleReset = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await auth.resetPassword(email);
            alert("Reset link sent. Check your email.");
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4  w-full h-screen  ">
            <form onSubmit={handleReset} className="bg-primary my-30  p-6 rounded-lg shadow-md
             max-w-md mx-auto flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-4 text-white">Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            className="border rounded p-2 border-white text-white" />
            <button type="submit" disabled={loading} className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Send reset link
            </button>
        </form>
        </div>
        
    );
};

export default ForgotPassword;
