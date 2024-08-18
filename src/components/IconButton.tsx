import React from 'react';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<Props> = ({ icon }) => {
  return (
    <div role='button' className='bg-white hover:bg-gray-50 rounded-full hover:drop-shadow-md p-2 inline-block'>
      {icon}
    </div>
  )
}

export default IconButton