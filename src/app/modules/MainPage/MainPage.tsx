import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import AddDialog from '../AddDialog';
import Navbar from '../Navbar';
import WordTable from '../WordTable';

export const MainPage = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const handleAddDialogToggle = () => {
    setIsAddDialogOpen(!isAddDialogOpen);
  };
  const solutions = [
    {
      name: 'Easy',
      href: '##',
    },
    {
      name: 'Medium',
      href: '##',
    },
    {
      name: 'Hard',
      href: '##',
    },
  ];
  return (
    <div className="flex flex-col p-4">
      <Navbar />
      <div className="flex gap-4">
        <button
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  w-40 justify-self-right"
          type="button"
          data-modal-toggle="large-modal"
          onClick={() => {
            handleAddDialogToggle();
          }}
        >
          Add Word
        </button>
        <Popover className="relative">
          {(open: any) => (
            <>
              <Popover.Button
                className={`
                ${open ? '' : 'text-opacity-90'}
                text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span>Level</span>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 min-w-max px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 w-fit">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white p-7 ">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {item.name}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      <WordTable />
      <AddDialog open={isAddDialogOpen} onClose={handleAddDialogToggle} />
    </div>
  );
};
