import React from 'react';

const Button = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 text-slate-700 font-bold hover:bg-blue-50 active:bg-blue-100 capitalize *:inline-block ${
        props.disabled && 'btn-disabled'
      } ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
