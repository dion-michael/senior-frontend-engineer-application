import React, { PropsWithChildren } from 'react';

const FormDescription: React.FC<PropsWithChildren> = ({ children }) => {
  return <span className="form-subtitle block mb-5">{children}</span>;
};

export default FormDescription;
