import React from 'react';
import Advertise from '~/components/advertise';
import Header from '~/components/header';
import SignupForm from '~/components/signup';

const IndexPage = () => {
  return (
    <div>
      <div>
        <Header username=""/>
        <Advertise/>
        <SignupForm/>
      </div>  
    </div>
  );
};

export default IndexPage;
