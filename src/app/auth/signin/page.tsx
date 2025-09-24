"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { User, CheckCheck, LoaderCircle } from "lucide-react";

export default function SignIn() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
                [name]: value,
        }))
    }

    const errorMessages: {[key: string]: string} = {
        MISSING_CREDENTIALS: "please provide both email and password",
        INVALID_EMAIL: "No account found with this email",
        INCORRECT_PASSWORD: "Incorrect password. Please try again.",
        CredentialsSignin: "Invalid Credentials. Please check your email or password",
        default: "An unexpected error occurred. Please try again later."
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true)

        try {
            const { email, password } = userData;
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setLoading(false)
                setValid(false)
                setError(errorMessages[res.error] || errorMessages.default);
            } else {
                setLoading(false)
                setValid(true)
                router.push("/account");
            }
        } catch (error) {
            setError(errorMessages.default);
            console.error("Sign-in error:", error);
        }
    };

    return (
        <main className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-1 bg-gray-100 items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Sign In</h3>
                    <div className="py-[0.25rem] px-[0.75rem] bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        {loading ? <LoaderCircle  size={16} className="animate-spin"/>
                            : valid ? <CheckCheck size={16} className="text-green-600" />
                                : <User size={16} className="text-blue-600" />}
                    </div>
                </div>
                {error && <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded border border-red-200">{error}</p>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <button type="submit" className="bg-[#B05216] active:bg-[#4F2915] text-white px-10 py-2 rounded-lg
                    flex cursor-pointer border-b-2 border-[#4F2915] items-center shadow-md text-sm">
                    Sign In
                </button>
                <p className="mt-4 text-center">
                    Don’t have an account?{" "}
                    <Link href="/auth/signup" className="text-[#B05216]">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
        </main>
    );
}