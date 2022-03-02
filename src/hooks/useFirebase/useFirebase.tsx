import {
  doc,
  collection,
  setDoc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';

import db from '../../config/Firebase';
export interface IWord {
  _id?: string;
  word?: string;
  meaning?: string;
  synonyms?: string[];
  antonyms?: string[];
  level?: string;
  bands?: number;
  author?: string;
}
export const newWord = async (payload: IWord) => {
  await setDoc(doc(collection(db, 'words')), payload);
};

export const updateWord = async (id: string, payload: any) => {
  await updateDoc(doc(collection(db, 'words'), id), payload);
};

export const getAllWords = async () => {
  return new Promise((resolve, reject) => {
    const q = query(collection(db, 'words'));

    onSnapshot(q, (querySnapshot) => {
      let data: IWord[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      resolve(data);
    });
  });
};
