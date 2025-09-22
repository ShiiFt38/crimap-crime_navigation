"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";

export default function SignUp() {
    const [ newUser, setNewUser ] = useState({
        username: "",
        email: "",
        password: "",
        fullName: "",
        phone: "",
    })

    const [error, setError] = useState("");
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewUser(prevUserData => ({
            ...prevUserData,
            [name]: value,
        }))
        console.log(newUser);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const { username, email, password, fullName, phone } = newUser;
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, full_name: fullName, phone }),
            });

            const data = await res.json(); // This line throws if response is not JSON
            if (res.ok) {
                alert("Sign-up successful! Please sign in.");
                router.push("/auth/signin");
            } else {
                setError(data.error || "Something went wrong" + (data.details ? `: ${data.details}` : ""));
            }
        } catch (error) {
            setError("An unexpected error occurred. Check the console for details.");
            console.error("Signup fetch error:", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4 sm:mx-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Sign Up</h3>
                    <div className="py-[0.25rem] px-[0.75rem] bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <User size={16} className="text-blue-600" />
                    </div>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name (optional)"
                    value={newUser.fullName}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={newUser.phone}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 border rounded"
                />
                <button type="submit" className="bg-[#B05216] active:bg-[#4F2915] text-white px-10 py-2 rounded-lg
                    flex cursor-pointer border-b-2 border-[#4F2915] items-center shadow-md text-sm">
                    Sign Up
                </button>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link href="/auth/signin" className="text-[#B05216]">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
}