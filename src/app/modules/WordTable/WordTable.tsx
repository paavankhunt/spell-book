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
      <table className="sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-white">
          <tr className="bg-teal-400 sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0  ">
            <th className="p-3 text-left">Word</th>
            <th className="p-3 text-left">Meaning</th>
            <th className="p-3 text-left">Synonyms</th>
            <th className="p-3 text-left">Antonyms</th>
            <th className="p-3 text-left">Level</th>
            <th className="p-3 text-left">Added by</th>
            <th className="p-3 text-left"></th>
          </tr>
        </thead>
        <tbody className="sm:flex-none">
          {words.map((word: IWord) => (
            <WordRow wordData={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
});
