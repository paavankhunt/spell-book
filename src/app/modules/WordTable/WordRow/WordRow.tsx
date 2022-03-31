import React, { Fragment, memo } from 'react';
import { Delete, Edit } from 'icons';
import WordRowData from '../WordRowData';
import AddDialog from 'app/modules/AddDialog';
import { useAppDispatch } from 'store';
import { removeWord } from 'store/words/reducer';
import { deleteWord } from 'hooks/useFirebase/useFirebase';
import { Popover, Transition } from '@headlessui/react';
import DeleteDialog from 'app/modules/DeleteDialog';

export const WordRow = memo((props: any) => {
  const dispatch = useAppDispatch();
  const { wordData } = props;
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const handleAddDialogToggle = () => {
    setIsAddDialogOpen(!isAddDialogOpen);
  };
  const handleDeleteDialogToggle = () => {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  };
  function handleDelete(id: any): void {
    deleteWord(id).then((res) => {
      if (res) {
        dispatch(removeWord(id));
      }
    });
  }
  return (
    <tr className=" sm:table-row mb-2 sm:mb-0">
      <WordRowData
        className="bg-amber-100"
        value={
          wordData.word
            ? wordData.word.charAt(0).toUpperCase() + wordData.word.slice(1)
            : '-'
        }
        link={`https://www.google.com/search?q=define+${wordData.word}`}
        curser="pointer"
      />
      <WordRowData value={wordData.meaning ? wordData.meaning : '-'} />
      <WordRowData
        value={wordData.synonyms ? (wordData.synonyms || [])?.join(', ') : '-'}
      />
      <WordRowData
        value={wordData.antonyms ? (wordData.antonyms || [])?.join(', ') : '-'}
      />
      <WordRowData value={wordData.level} />
      <WordRowData value={wordData.author} />
      <td>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? '' : 'text-opacity-90'}
                group px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span>...</span>
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
                <Popover.Panel className="absolute z-50 min-w-max transform -translate-x-full -translate-y-9  sm:px-0 ">
                  <div className=" rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-orange-200">
                    <button className="p-2 shadow-3xl mr-1 hover:bg-slate-100">
                      <Edit
                        className="w-5 h-5 fill-current"
                        onClick={() => handleAddDialogToggle()}
                      />
                    </button>
                    <button
                      className="p-2 hover:bg-slate-100"
                      onClick={() => handleDeleteDialogToggle()}
                    >
                      <Delete className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <DeleteDialog
          onClose={handleDeleteDialogToggle}
          open={isDeleteDialogOpen}
          onDelete={() => handleDelete(wordData.id)}
        />
        <AddDialog
          open={isAddDialogOpen}
          onClose={handleAddDialogToggle}
          wordData={wordData}
          isUpdate={true}
        />
      </td>
    </tr>
  );
});
