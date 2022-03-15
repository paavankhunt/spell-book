import React from 'react';

export const FormInput = (prop: any) => {
  const { label, ...props } = prop;
  return (
    <div className="flex flex-col">
      <label className="mb-1" htmlFor={props}>
        {label}
      </label>
      <input
        onBlur={props.onBlur}
        className={' mt-2 mb-5 border-400 border-solid boder-2 '}
        {...props}
      />
      <span>{props.touched[props] && props.error[props]}</span>
    </div>
  );
};
