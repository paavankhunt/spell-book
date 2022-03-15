import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IWord } from 'hooks/useFirebase/useFirebase';

export interface WordsContext {
  wordslist: IWord[];
}

const initialState: WordsContext = {
  wordslist: [],
};

export const wordReducer = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<IWord>) => {
      state.wordslist.push(action.payload);
    },
    removeWord: (state, action: PayloadAction<string>) => {
      state.wordslist = state.wordslist.filter(
        (word) => word.id !== action.payload
      );
    },
    updateWord: (state, action: PayloadAction<IWord>) => {
      state.wordslist = state.wordslist.map((word) =>
        word.id === action.payload.id ? action.payload : word
      );
    },
    addWords: (state, action: PayloadAction<IWord[]>) => {
      state.wordslist.push(...action.payload);
    },
  },
});

export const { addWord, removeWord, updateWord, addWords } =
  wordReducer.actions;

export default wordReducer.reducer;
