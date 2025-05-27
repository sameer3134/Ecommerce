import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const adminEmail = process.env.REACT_APP_LOGIN;
        if (email === adminEmail) {
            sessionStorage.setItem("adminAuth", adminEmail); // Store authentication
            navigate("/admin"); // Redirect to admin panel
        } else {
            setError("Unauthorized email! Access denied.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input 
                        type="text" 
                        placeholder="Enter Admin Password" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="border p-2 rounded-md"
                        required 
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
