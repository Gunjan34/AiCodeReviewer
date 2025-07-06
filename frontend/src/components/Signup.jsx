import React, { useState } from "react";
import axios from "axios";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/auth/signup",
        { Name, Email, Password }
      );
      if (response.data.success) {
        toast.success("Signup successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Signup failed!");
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
  <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-md shadow-md w-full max-w-[90%] sm:max-w-md md:max-w-lg text-black dark:text-white">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2 justify-center">
      <FaUserPlus className="text-teal-700" />
      Signup
    </h2>

    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="flex items-center border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700">
        <FaUser className="text-gray-500 mr-2" />
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full bg-transparent outline-none text-base sm:text-lg text-black dark:text-white"
          required
        />
      </div>

      {/* Email */}
      <div className="flex items-center border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700">
        <FaEnvelope className="text-gray-500 mr-2" />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full bg-transparent outline-none text-base sm:text-lg text-black dark:text-white"
          required
        />
      </div>

      {/* Password */}
      <div className="flex items-center border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700">
        <FaLock className="text-gray-500 mr-2" />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-transparent outline-none text-base sm:text-lg text-black dark:text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-teal-800 hover:bg-teal-900 w-full text-white py-2 rounded transition duration-200"
      >
        Signup
      </button>
    </form>

    <p className="text-center text-sm mt-4">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Login
      </Link>
    </p>
  </div>
</div>

    </AuthLayout>
  );
};

export default Signup;
