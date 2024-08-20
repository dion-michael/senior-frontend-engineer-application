import React from 'react';

const FormPaper: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...props }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div
        {...props}
        className={
          'bg-white border paper-size p-12 rounded-lg ' + props.className
        }
      >
        {children}
      </div>
    </div>
  );
};

export default FormPaper;
