import { Input, InputProps } from '@headlessui/react';
import React from 'react';

const SearchInput: React.FC<InputProps> = (props) => {
  return (
    <Input
      type="search"
      className="mb-5 w-full max-w-screen-lg h-12 rounded-lg px-4 text-lg text-slate-500"
      {...props}
    />
  );
};

export default SearchInput;
