import React, { PropsWithChildren } from 'react';

const FormTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <h2 className="form-title">{children}</h2>;
};

export default FormTitle;
