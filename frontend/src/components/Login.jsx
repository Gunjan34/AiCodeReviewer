import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/auth/login",
        { Email, Password }
      );
      if (response.data.success) {
        toast.success("Login successfully!");
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed!");
    }
  };

  return (
    <AuthLayout>
     <div className="flex flex-col justify-center items-center min-h-screen px-4">
  <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-md shadow-md w-full max-w-[90%] sm:max-w-md md:max-w-lg text-black dark:text-white">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2 justify-center">
      <FaSignInAlt className="text-teal-700" />
      Login
    </h2>

    <form className="space-y-4" onSubmit={handleSubmit}>
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
        Login
      </button>
    </form>

    <p className="text-center text-sm mt-4">
      Don't have an account?{" "}
      <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
        Signup
      </Link>
    </p>
  </div>
</div>

    </AuthLayout>
  );
};

export default Login;
