import { getAllWords } from 'hooks/useFirebase';
import React, { useEffect } from 'react';
import WordRow from './WordRow';

export const WordTable = () => {
  const [words, setWords] = React.useState<any>([]);
  const fetchData = async () => {
    try {
      const data = await getAllWords();
      setWords(data);
    } catch (err) {
      // TODO handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>WordTable</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Word</th>
            <th className="px-4 py-2">Meaning</th>
            <th className="px-4 py-2">Synonyms</th>
            <th className="px-4 py-2">Antonyms</th>
            <th className="px-4 py-2">Level</th>
            <th className="px-4 py-2">Bands</th>
            <th className="px-4 py-2">Author</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word: any) => (
            <WordRow word={word} key={word._id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
