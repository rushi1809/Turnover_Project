import React from 'react';
import Advertise from '~/components/advertise';
import Header from '~/components/header';
import { useRouter } from 'next/router';
import InterestsForm from '~/components/interestForm';

const InterestsPage = () => {
    const router = useRouter();
    const { userName } = router.query;
  return (
    <div>
      <div>
        <Header username={userName}/>
        <Advertise/>
        <InterestsForm/>
      </div>  
    </div>
  );
};

export default InterestsPage;
