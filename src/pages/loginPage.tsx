import React from 'react';
import Advertise from '~/components/advertise';
import Header from '~/components/header';
import LogIn from '~/components/logIn';

const LogInPage = () => {
  return (
    <div>
      <div>
        <Header username=""/>
        <Advertise/>
        <LogIn/>
      </div>  
    </div>
  );
};

export default LogInPage;
