import React, { useState } from 'react';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  
  const { mutate: createUser,reset,error: createUserError } = api.post.createUser.useMutation({
    onSuccess: (data) => {
      router.push( {pathname:'/verifyEmailPage',query:{userEmail:data.email,userName:data.name}} );
    },
  });

  const handleChange = (e:any) => {
    reset();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateEmail = (email:any) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  const handleSubmit = async (e:any) => {
    reset();
    e.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };
  
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      formValid = false;
    }
  
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
      createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setFormData({ name: '', email: '', password: '' }); 
      setErrors({ name: '', email: '', password: '' }); 
    } catch (error:any) {
      console.error('Error creating user:', error.message);
      if (error.response && error.response.data && error.response.data.error) {
        setErrors({ ...errors, email: error.response.data.error.message }); 
      } 
    }
    setLoading(false); 
  };
  
  
  return (
    <div className="flex justify-center min-h-full mt-8">
      <div className="w-full max-w-md p-5 border border-gray-200 rounded-xl">
        <h2 className="font-inter text-2xl font-semibold mb-4 text-center">Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder='Enter'/>
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder='Enter'/>
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder='Enter'/>
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>
          <button type="submit" className="bg-black text-white px-2 py-2 rounded-md w-full hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300" disabled={loading}>CREATE ACCOUNT</button>
          {loading && <div className="mt-2 flex justify-center"><div className="spinner-border text-blue-500" role="status"><span className="visually-hidden">Loading...</span></div></div>}
        </form>
        {createUserError?.message && <span className="text-red-500 text-center">{createUserError?.message}</span>}
        <p className="mt-4 text-gray-600 text-center">
          Have an Account?{' '}
          <Link href="/loginPage">
            <a className="text-black hover:text-black pl-1">LOGIN</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
