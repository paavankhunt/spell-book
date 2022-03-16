import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormInput from './FormInput';
import { IWord, modifyWord, newWord } from 'hooks/useFirebase/useFirebase';
import { useAppDispatch } from 'store';
import { addWord, updateWord } from 'store/words/reducer';
// import ReactChipInput from 'react-chip-input';

const validate = Yup.object({
  word: Yup.string()
    .required('Word is required')
    .matches(/^[a-zA-Z]+$/, 'Word must be alphabetical'),
  meaning: Yup.string(),
  synonyms: Yup.string(),
  antonyms: Yup.string(),
  level: Yup.string().required('Level is required'),
  bands: Yup.number(),
  author: Yup.string(),
});
// const includesword = (arrayOfArrays: any[], item: any) => {
//   let array, i, j;
//   for (i = 0; i < arrayOfArrays.length; ++i) {
//     array = arrayOfArrays[i];
//     for (j = 0; j < array.length; ++j) {
//       if (array[j] === item) {
//         return true;
//       }
//     }
//   }
//   return false;
// };
interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  isUpdate?: boolean;
  initValues?: IWord;
}
export const AddWordForm: React.FC<AddDialogProps> = ({
  open,
  onClose,
  isUpdate,
  initValues,
}) => {
  const dispatch = useAppDispatch();
  const initialstate = {
    word: '',
    meaning: '',
    synonyms: '',
    antonyms: '',
    level: 'easy',
    bands: 1,
    author: '',
  };
  const levels = [
    {
      label: 'Easy',
      value: 'easy',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'Hard',
      value: 'hard',
    },
  ];

  const updateInitialState = {
    word: initValues && initValues.word,
    meaning: initValues && initValues.meaning,
    synonyms: initValues && initValues.synonyms?.join(', '),
    antonyms: initValues && initValues.antonyms?.join(', '),
    level: initValues && initValues.level,
    bands: initValues && initValues.bands,
    author: initValues && initValues.author,
    id: initValues && initValues.id,
  };
  const handleSubmit = async (values: any, helper: FormikHelpers<any>) => {
    helper.setSubmitting(true);
    if (isUpdate) {
      await modifyWord(initValues?.id, {
        word: values.word,
        meaning: values.meaning,
        synonyms: values.synonyms?.split(', '),
        antonyms: values.antonyms?.split(', '),
        level: values.level,
        bands: values.bands,
        author: values.author,
      }).then((res) => {
        if (res) {
          dispatch(
            updateWord({
              id: initValues?.id,
              word: formik.values.word,
              meaning: formik.values.meaning,
              synonyms: formik.values.synonyms?.split(', '),
              antonyms: formik.values.antonyms?.split(', '),
              level: formik.values.level,
              bands: formik.values.bands,
              author: formik.values.author,
            })
          );
        }
      });
      toast.success('Word updated successfully');
    } else {
      await newWord({
        word: values.word,
        meaning: values.meaning,
        synonyms: values.synonyms?.split(', '),
        antonyms: values.antonyms?.split(', '),
        level: values.level,
        bands: values.bands,
        author: values.author,
      }).then((res) => {
        if (res) {
          dispatch(
            addWord({
              word: formik.values.word,
              meaning: formik.values.meaning,
              synonyms: formik.values.synonyms?.split(', '),
              antonyms: formik.values.antonyms?.split(', '),
              level: formik.values.level,
              bands: formik.values.bands,
              author: formik.values.author,
            })
          );
        }
      });
      formik.resetForm({
        values: initialstate,
        errors: {},
        touched: {},
      });
      toast.success('Word added successfully');
    }
    helper.setSubmitting(false);
    onClose();
  };
  const formik = useFormik({
    initialValues: isUpdate ? updateInitialState : initialstate,
    validationSchema: validate,
    onSubmit: handleSubmit,
  });

  return (
    <div className="justify-self-center">
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
        <div className="flex flex-col">
          <label className="mb-1 text-white" htmlFor="level">
            Level
          </label>
          <select
            name="level"
            className="mt-2 mb-5 border-400 border-solid boder-2"
            value={formik.values.level}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {levels.map((el) => (
              <option value={el.value} key={el.value}>
                {el.label}
              </option>
            ))}
          </select>
          <span>{formik.errors['level'] && formik.touched['level']}</span>
        </div>
        <FormInput
          type="number"
          max="9"
          min="1"
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
            {formik.isSubmitting
              ? 'Loading...'
              : isUpdate
              ? 'Update Word'
              : 'Add Word'}
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
