import React, { PropsWithChildren } from 'react';

const AppBanner: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-72 bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center">
      <div className="container mx-auto sm:w-full md:w-4/5 px-4 md:px-0 -mt-16 ">
        <div className="w-full max-w-screen-lg mx-auto rounded-lg drop-shadow-md">
          <div className="mb-5 text-white text-5xl">
            <span>Clinic</span>
            <span className="font-bold">OS</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppBanner;
