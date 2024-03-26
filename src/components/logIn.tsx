import React, { useState } from 'react';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LogIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const { mutate: logIN,error: logInError } = api.post.login.useMutation({
    onSuccess: (data) => {
      router.push( {pathname:'/interestsPage',query:{userId:data.id,userEmail:data.email,userName:data.name}} );
    }
  });

  const validateEmail = (email:any) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      formValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      formValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      formValid = false;
    }
  
    if (!formValid) {
      setErrors(newErrors);
      return;
    }
    setLoading(true); 
    try {
      logIN({ email: formData.email, password: formData.password });
    } catch (error:any) {
      console.error('Error logging in:', error.message);
    }
    setLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center min-h-full mt-8">
      <div className="w-full max-w-md p-5 border border-gray-200 rounded-xl mb-5">
        <h2 className="font-inter text-2xl font-semibold mb-4 text-center">Login</h2>
        <p className="mt-4 text-sm text-center text-black-900 font-inter text-lg font-medium">Welcome back to ECOMMERCE</p>
        <p className="text-sm text-center text-black-600 mt-1">The next gen marketplace</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                onClick={toggleShowPassword}
              >
                {showPassword ? (
                  <span className='underline'>Hide</span>
                ) : (
                  <span className='underline'>Show</span>
                )}
              </button>
            </div>
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>
          <button type="submit" className="bg-black text-white px-2 py-2 rounded-md w-full hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300">Log In</button>
          {logInError?.message && <p className="text-red-500 text-center mt-2">{logInError.message}</p>}
          {loading && <div className="mt-2 flex justify-center"><div className="spinner-border text-blue-500" role="status"><span className="visually-hidden">Loading...</span></div></div>}
        </form>
        <div className="flex items-center mt-4">
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="flex items-center justify-center mt-5 ">
          <span className="mx-2 text-center text-sm text-gray-600">
            Don't have an account?
            <Link href="/">
              <a className="text-black hover:text-black pl-1">SIGN UP</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
