import React from 'react';
import Advertise from '~/components/advertise';
import Header from '~/components/header';
import VerifyEmailForm from '~/components/verifyEmail';
import { useRouter } from 'next/router';

const VerifyEmailPage = () => {
    const router = useRouter();
    const { userEmail,userName } = router.query;
    console.log(userEmail,userName)
  return (
    <div>
      <div>
        <Header username={userName}/>
        <Advertise/>
        <VerifyEmailForm userEmail={userEmail}/>
      </div>  
    </div>
  );
};

export default VerifyEmailPage;
