import React, { PropsWithChildren } from 'react';

const FormPaper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="bg-white border w-full sm:w-4/5 lg:w-4/6 p-12 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default FormPaper;
