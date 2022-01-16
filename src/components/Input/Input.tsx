import { FormikLikeContext } from 'components/FormikLikeForm/FormikLikeForm';
import { useContext } from 'react';

import { setFirstCapitalLetter } from 'utils';

export const Input = ({ name, placeholder }: InputProps) => {
  const {
    formState: { errors },
    handleChange,
    handleBlur
  } = useContext(FormikLikeContext);
  const capitalLetterName = setFirstCapitalLetter(name);

  return (
    <>
      <label>{capitalLetterName}</label>
      <input
        onChange={e => {
          handleChange(e);
        }}
        onBlur={e => handleBlur(e)}
        name={name}
        placeholder={placeholder || ''}
      />
      <span>{errors[name]}</span>
    </>
  );
};

interface InputProps {
  name: string;
  placeholder?: string;
}
