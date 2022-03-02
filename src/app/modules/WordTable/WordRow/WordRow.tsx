import React from 'react';

interface WordRowProps {
  word: any;
}

export const WordRow: React.FC<WordRowProps> = (props: any) => {
  const { word } = props;
  return (
    <div>
      <tr>
        <td className="border px-4 py-2">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {word.word}
              </p>
            </div>
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {word.meaning}
              </p>
            </div>
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {word.synonyms.join(', ')}
              </p>
            </div>
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {word.antonyms.join(', ')}
              </p>
            </div>
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {word.level}
              </p>
            </div>
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {word.bands}
              </p>
            </div>
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className="flex items-center">
            <div className="ml-4">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {word.author}
              </p>
            </div>
          </div>
        </td>
      </tr>
    </div>
  );
};
