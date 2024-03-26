import React from 'react';
import Advertise from './advertise';

const Header = ({ username }:any) => {
  return (
    <div className="bg-white py-4 px-6 top-0 left-0 right-0 z-50">
      <div className="flex justify-end items-center mb-2">
        <nav className="text-gray-500 text-xs space-x-4">
          <a href="#">Help</a>
          <a href="#">Orders & Returns</a>
          <span>Hi, {username ? username : "Guest"}</span>
        </nav>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-black font-bold text-2xl mb-4 sm:mb-0">ECOMMERCE</div>
        <nav className="text-black font-bold text-md space-x-4 flex-grow text-center mb-4 sm:mb-0 ml-[-50px]">
          <a href="#">Categories</a>
          <a href="#">Sale</a>
          <a href="#">Clearance</a>
          <a href="#">New stock</a>
          <a href="#">Trending</a>
        </nav>
        <div className="flex items-center space-x-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
        </div>
      </div>
    </div>  
    
  );
};

export default Header;
