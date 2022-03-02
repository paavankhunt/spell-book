import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IWord, newWord, updateWord } from 'hooks/useFirebase';
import FormInput from './FormInput';

const validate = Yup.object({
  word: Yup.string().required('Word is required'),
  meaning: Yup.string().required('Meaning is required'),
  synonyms: Yup.string(),
  antonyms: Yup.string(),
  level: Yup.string().required('Level is required'),
  bands: Yup.number(),
  author: Yup.string(),
});

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  isUpdate?: boolean;
}
export const AddWordForm: React.FC<AddDialogProps> = ({
  open,
  onClose,
  isUpdate,
}) => {
  const [initialState, setInitialState] = React.useState<any>({
    word: '',
    meaning: '',
    synonyms: '',
    antonyms: '',
    level: '',
    bands: 0,
    author: '',
  });
  const handleInitialState = (initialState: IWord) => {
    setInitialState({
      word: initialState.word,
      meaning: initialState.meaning,
      synonyms: initialState.synonyms,
      antonyms: initialState.antonyms,
      level: initialState.level,
      bands: initialState.bands,
      author: initialState.author,
      _id: initialState._id,
    });
  };
  const handleSubmit = () => {
    formik.isSubmitting = true;
    isUpdate
      ? updateWord(initialState._id, {
          word: formik.values.word,
          meaning: formik.values.meaning,
          synonyms: formik.values.synonyms.split(','),
          antonyms: formik.values.antonyms.split(','),
          level: formik.values.level,
          bands: formik.values.bands,
          author: formik.values.author,
        })
      : newWord({
          word: formik.values.word,
          meaning: formik.values.meaning,
          synonyms: formik.values.synonyms.split(','),
          antonyms: formik.values.antonyms.split(','),
          level: formik.values.level,
          bands: formik.values.bands,
          author: formik.values.author,
        });

    toast.success('Word added successfully');
    formik.isSubmitting = false;
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: validate,
    onSubmit: handleSubmit,
  });

  return (
    <div className="justify-self-center">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        <FormInput
          label="Word"
          name="word"
          value={formik.values.word}
          onChange={formik.handleChange}
          error={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <FormInput
          label="Meaning"
          name="meaning"
          value={formik.values.meaning}
          onChange={formik.handleChange}
          error={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <FormInput
          label="Synonyms"
          name="synonyms"
          value={formik.values.synonyms}
          onChange={formik.handleChange}
          error={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <FormInput
          label="Antonyms"
          name="antonyms"
          value={formik.values.antonyms}
          onChange={formik.handleChange}
          error={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <FormInput
          label="Level"
          name="level"
          value={formik.values.level}
          onChange={formik.handleChange}
          error={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <FormInput
          label="Bands"
          name="bands"
          value={formik.values.bands}
          onChange={formik.handleChange}
          error={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <FormInput
          label="Author"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
          error={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />

        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            data-modal-toggle="large-modal"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit"
          >
            {formik.isSubmitting ? 'Loading...' : 'Add Word'}
          </button>
          <button
            onClick={onClose}
            data-modal-toggle="large-modal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
