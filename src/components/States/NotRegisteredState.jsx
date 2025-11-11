import React from 'react';

const NotRegisteredState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
    <div className="flex flex-col items-center justify-center p-8 w-[50%] h-[50%] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-text mb-2">No profile data found</h2>
      <p className="text-secondary-text">Please register first</p>
    
    </div>
    </div>
  );
};

export default NotRegisteredState;
