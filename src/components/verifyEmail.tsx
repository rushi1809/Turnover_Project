import React, { useState,useRef } from 'react';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';

const VerifyEmailForm = ({userEmail}:any) => {
  const router = useRouter();
  const [otp, setOtp] = useState(Array(8).fill('')); // State to store OTP
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading state
  const inputsRef:any = useRef([]);

  const handleChange = (e:any, index:any) => {
    setError('');
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && index < 7 && inputsRef.current != undefined) {
      inputsRef.current[index + 1].focus();
    }
  };

  
  const { mutate: verifyOtp, error: verifyOtpError } = api.post.checkNumber.useMutation({
    onSuccess: (data) => {
      if (data.result === "success") {
        router.push('/loginPage');
      }
    },
  });

  const handleVerify = async () => {
    setLoading(true);
    const otpValue: number = parseInt(otp.join(''));
    if (!otpValue) {
      setError('Password is required');
      return
    }
    try {
      verifyOtp({email:userEmail,number: otpValue });
    } catch (error:any) {
      console.error('Error verifying OTP:', error.message);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-full mt-8">
      <div className="w-full max-w-md p-10 border border-gray-200 rounded-xl">
        <h2 className="font-inter text-2xl font-semibold mb-4 text-center">Verify Your Email</h2>
        <p className="text-center text-black">Enter the 8 digit code you have received on</p>
        <p className="text-center text-black font-semibold mb-4">{userEmail}</p>
        <div className="flex justify-start ml-7">
          <p className="text-black">Code</p>
        </div>
        <div className="flex justify-center mb-12">
          {/* Render 8 small boxes for OTP */}
          {Array.from({ length: 8 }, (_, index) => (
            <input
              ref={(el:any) => (inputsRef.current[index] = el)} 
              key={index}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(e, index)}
              className="w-8 h-8 border border-gray-300 rounded-md text-center mx-1 focus:outline-none"
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          className="bg-black text-white px-2 py-2 rounded-md w-full hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300"
          disabled={loading}
        >
          Verify
        </button>
        {verifyOtpError?.message && <span className="text-red-500 text-center">{verifyOtpError.message}</span>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyEmailForm;
