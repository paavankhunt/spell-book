import { IWord } from 'hooks/useFirebase/useFirebase';
import React from 'react';
import AddWordForm from '../AddWordForm';

interface AddDialogProps {
  wordData?: IWord;
  open: boolean;
  onClose: () => void;
  isUpdate?: boolean;
}

export const AddDialog: React.FC<AddDialogProps> = ({
  open,
  onClose,
  wordData,
  isUpdate,
}) => {
  return (
    <div
      className={`${
        open ? '' : 'hidden'
      }   max-w-2xl    fixed z-50 justify-center items-center flex `}
      id="large-modal"
    >
      <div className="fixed h-fit w-full left-0 top-0">
        <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {isUpdate ? 'Update Word' : 'Add Word'}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="large-modal"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <AddWordForm
              open={open}
              onClose={onClose}
              initValues={wordData}
              isUpdate={isUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
