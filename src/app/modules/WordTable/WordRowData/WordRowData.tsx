import React from 'react';

export const WordRowData = ({ ...props }) => {
  return (
    <td className="border-grey-light border hover:bg-gray-100 p-3" {...props}>
      <a
        className="text-sm font-bold leading-5  text-gray-900"
        href={props.link}
        target="_blank"
        rel="noreferrer"
      >
        {props.value}
      </a>
    </td>
  );
};
