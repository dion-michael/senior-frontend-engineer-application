import React from 'react';

const Save = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className={props.className || 'size-6'}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3 3v18h18V6l-3-3H3ZM7.5 3v6h9V3M6 21v-9h12v9M14.25 5.25v1.5"
      />
    </svg>
  );
};

export default Save;
