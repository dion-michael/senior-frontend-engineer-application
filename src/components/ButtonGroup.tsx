import React from 'react';

const ButtonGroup = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  return (
    <div className="paper-size mx-auto flex mb-5 rounded-lg">
      <div className="flex-grow" />
      <div
        className={
          'bg-white rounded-lg *:border-l last:border-l-0 ' + props.className
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default ButtonGroup;
