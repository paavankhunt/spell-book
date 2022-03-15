import { getAllWords } from 'hooks/useFirebase';
import { IWord } from 'hooks/useFirebase/useFirebase';
import React, { memo, useCallback, useEffect } from 'react';
import WordRow from './WordRow';
import { useAppDispatch, useAppSelector } from '../../../store';
import { addWords } from 'store/words/reducer';

export const WordTable = memo(() => {
  const words = useAppSelector((state) => state.words.wordslist);
  const dispatch = useAppDispatch();
  const fetchData = useCallback(async () => {
    try {
      const data = await getAllWords();
      dispatch(addWords(data));
    } catch (err) {
      // TODO handle error
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <table className=" table-auto w-full ">
        <thead>
          <tr>
            <th className="px-4 py-2">Word</th>
            <th className="px-4 py-2">Meaning</th>
            <th className="px-4 py-2">Synonyms</th>
            <th className="px-4 py-2">Antonyms</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Bands</th>
            <th className="px-4 py-2">Added by</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word: IWord) => (
            <WordRow wordData={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
