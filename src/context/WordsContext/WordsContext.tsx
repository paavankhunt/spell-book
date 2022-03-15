export {};
// import { getAllWords, IWord } from 'hooks/useFirebase/useFirebase';
// import { createContext, useEffect, useState } from 'react';

// interface IWordsContext {
//   words: IWord[];
//   dispatchUserEvent: (event: string, payload: any) => void;
// }

// export const WordsContext = createContext<IWordsContext>({
//   words: [],
//   dispatchUserEvent: () => {},
// });

// export const WordsProvider: React.FC = ({ children }) => {
//   const [words, setWords] = useState<IWord[]>([]);
//   useEffect(() => {
//     (async () => {
//       const response = await getAllWords();
//       setWords(response);
//     })();
//   }, []);
//   const dispatchUserEvent = (actionType: string, payload: IWord) => {
//     switch (actionType) {
//       case 'ADD_WORD':
//         setWords([...words, payload]);
//         return;
//       case 'UPDATE_WORD':
//         setWords(
//           words.map((word) => {
//             if (word.id === payload.id) {
//               return payload;
//             }
//             return word;
//           })
//         );
//         return;
//       case 'DELETE_WORD':
//         setWords(words.filter((word) => word.id !== payload.id));
//         return;

//       default:
//         return;
//     }
//   };
//   return (
//     <WordsContext.Provider value={{ words, dispatchUserEvent }}>
//       {children}
//     </WordsContext.Provider>
//   );
// };
