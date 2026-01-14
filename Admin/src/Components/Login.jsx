import React, { useState } from 'react';
import axios from "axios";
import { BACKENDURL } from "../App"
import { toast } from 'react-toastify';

const Login = ({settoken}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(BACKENDURL + "/api/users/admin", { email:email.trim(), password:password.trim() }, {
        headers: { 'Content-Type': 'application/json' }
      });
      if(response.data.success){
        settoken(response.data.token);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-9 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email Address
            </label>
            <input
              onChange={(e) => setemail(e.target.value)}
              type="email"
              required
              placeholder="Enter Email"
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Password
            </label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              required
              value={password}
              placeholder="Enter Password"
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


