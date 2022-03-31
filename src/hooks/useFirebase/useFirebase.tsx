import {
  doc,
  collection,
  setDoc,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import db from '../../config/Firebase';
export interface IWord {
  id?: string;
  word?: string;
  meaning?: string;
  synonyms?: string[];
  antonyms?: string[];
  level?: string;
  author?: string;
}
export const newWord = async (payload: IWord) => {
  return new Promise(async (resolve, reject) => {
    await setDoc(doc(collection(db, 'words')), payload)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const modifyWord = async (id: any, payload: any) => {
  return new Promise(async (resolve, reject) => {
    await updateDoc(doc(collection(db, 'words'), id), payload)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteWord = (id: any) => {
  return new Promise(async (resolve, reject) => {
    await deleteDoc(doc(collection(db, 'words'), id))
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAllWords = async (): Promise<IWord[]> => {
  return new Promise((resolve, reject) => {
    const q = query(collection(db, 'words'));

    onSnapshot(q, (querySnapshot) => {
      let data: IWord[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      resolve(data as IWord[]);
      reject(new Error('Error'));
    });
  });
};
