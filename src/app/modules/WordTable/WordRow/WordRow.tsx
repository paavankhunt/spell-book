import React, { memo } from 'react';
import { Delete, Edit } from 'icons';
import WordRowData from '../WordRowData';
import AddDialog from 'app/modules/AddDialog';
import { useAppDispatch } from 'store';
import { removeWord } from 'store/words/reducer';
import { deleteWord } from 'hooks/useFirebase/useFirebase';

export const WordRow = memo((props: any) => {
  const dispatch = useAppDispatch();
  const { wordData } = props;
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const handleAddDialogToggle = () => {
    setIsAddDialogOpen(!isAddDialogOpen);
  };
  function handleDelete(id: any): void {
    deleteWord(id).then((res) => {
      if (res) {
        dispatch(removeWord(id));
      }
    });
  }
  return (
    <tr>
      <WordRowData
        value={
          wordData.word
            ? wordData.word.charAt(0).toUpperCase() + wordData.word.slice(1)
            : '-'
        }
      />
      <WordRowData value={wordData.meaning ? wordData.meaning : '-'} />
      <WordRowData
        value={wordData.synonyms ? (wordData.synonyms || [])?.join(', ') : '-'}
      />
      <WordRowData
        value={wordData.antonyms ? (wordData.antonyms || [])?.join(', ') : '-'}
      />
      <WordRowData value={wordData.level} />
      <WordRowData value={wordData.bands} />
      <WordRowData value={wordData.author} />

      <td>
        <button className="p-2 rounded-full bg-slate-200 shadow-3xl">
          <Edit
            className="w-5 h-5 fill-current"
            onClick={() => handleAddDialogToggle()}
          />
        </button>
        <button
          className="p-2 rounded-full bg-slate-200"
          onClick={() => handleDelete(wordData.id)}
        >
          <Delete className="w-5 h-5 fill-current" />
        </button>
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
