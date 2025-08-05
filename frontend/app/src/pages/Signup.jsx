import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {

    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfrimPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async(e) => {
        e.preventDefault();

        if(password!==confirmPassword){
            alert('Passwords do not match');
            return;
        }

        try{
            const res = await fetch(`${BASE_URL}/api/auth/signup`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({name,email,password}),
            });

            const data = await res.json();

            if(res.ok){
                navigate('/dashboard');
            }else{
                alert(data.message || 'Signup failed');
            }
        }catch(err){
            console.error('Signup error: ',err);
            alert('Something went wrong. Please try again. ');
        }
    };

  return (

   <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-20 p-4 md:p-10 bg-gray-100">
      
      <div
        id="intern-dashboard-portal"
        className="border-2 border-gray-900 text-red-600 px-6 py-10 text-3xl text-center font-bold rounded-lg shadow-md bg-white w-full max-w-xs flex flex-col justify-center"
      >
        <p className="mb-2">Intern</p>
        <p className="mb-2">Dashboard</p>
        <p>Portal</p>
      </div>

      <form
        onSubmit={handleSignup}
        id="signup-div"
        className="border-2 border-gray-900 px-6 py-8 text-base text-center w-full max-w-xs bg-white shadow-md rounded-lg flex flex-col justify-center"
      >
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
        
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="confirm-password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Enter Confirm Password"
          value={confirmPassword}
          onChange={(e)=>setConfrimPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600 transition-colors duration-200 mb-4">
          SUBMIT
        </button>

        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
