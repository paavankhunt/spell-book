import React from 'react';

export const WordRowData = ({ ...props }) => {
  return (
    <td className="border px-2  py-2 ">
      <div className="flex items-center">
        <p className="text-sm font-bold leading-5  text-gray-900">
          {props.value}
        </p>
      </div>
    </td>
  );
};
