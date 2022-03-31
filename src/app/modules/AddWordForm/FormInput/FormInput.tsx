import React from 'react';

export const FormInput = (prop: any) => {
  const { label, ...props } = prop;
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-white" htmlFor={props}>
        {label}
      </label>
      <input
        onBlur={props.onBlur}
        className={' mt-2 mb-1 border-400 border-solid rounded-md boder-2'}
        {...props}
      />
      <span className=" text-red-500 mb-2">
        {props.touched[props.name] && props.error[props.name]}
      </span>
    </div>
  );
};
