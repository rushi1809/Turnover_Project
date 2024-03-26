import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';

const InterestsForm = () => {
  const router = useRouter();
  const { userId, userEmail, userName } :any = router.query;
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [interests, setInterests] = useState<{ id: number; name: string }[]>([]);
  const itemsPerPage = 6;

  const { data } = api.post.fetchInterests.useQuery({ page: currentPage, limit: itemsPerPage });
  const { mutate: updateUserInterestsfields } = api.post.updateUserInterests.useMutation();
  const { data: userInterestsData }:any = api.post.fetchUserInterests.useQuery({ userId: parseInt(userId) });

  useEffect(() => {
    if (data) {
      setInterests(data.interests);
    }
  }, [data]);

  useEffect(() => {
    if (userInterestsData && userInterestsData.interest_id) {
      setSelectedInterests(userInterestsData.interest_id);
    }
  }, [userInterestsData]);

  const handleInterestToggle = (interest: { id: number; name: string }) => {
    const updatedInterests = selectedInterests.includes(interest.id)
      ? selectedInterests.filter(item => item !== interest.id)
      : [...selectedInterests, interest.id];

    setSelectedInterests(updatedInterests);
    updateUserInterests(updatedInterests);
  };

  const updateUserInterests = (interestIds: number[]) => {
    try {
      updateUserInterestsfields({
        userId: parseInt(userId),
        interestIds: interestIds,
      });
    } catch (error:any) {
      console.error('Error updating UserInterests:', error.message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center min-h-full mt-8">
      <div className="w-full max-w-md p-10 border border-gray-200 rounded-xl">
        <h2 className="font-inter text-2xl font-semibold mb-4 text-center">Please Mark your Interests!</h2>
        <p className="text-center text-black mb-4">We will keep you notified.</p>
        <h3 className="text-left text-black font-semibold mb-4">My Saved interests!</h3>
        <div className="space-y-2">
          {interests.length === 0 ? (
            <p>Loading interests...</p>
          ) : (
            interests.map((interest, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={selectedInterests.includes(interest.id)}
                  onChange={() => handleInterestToggle(interest)}
                />
                <div
                  className={`h-5 w-5 border border-gray-300 rounded ${
                    selectedInterests.includes(interest.id) ? 'bg-black' : 'bg-gray-300'
                  } flex items-center justify-center`}
                >
                  {selectedInterests.includes(interest.id) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="ml-2 text-black font-inter">{interest.name}</span>
              </label>
            ))
          )}
        </div>
        <div className="flex justify-start mt-4">
          <Pagination
            totalItems={data?.totalCount} 
            itemsPerPage={6} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default InterestsForm;
