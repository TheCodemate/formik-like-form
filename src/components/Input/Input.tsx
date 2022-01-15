import { FormikLikeContext } from 'components/FormikLikeForm/FormikLikeForm';
import { useContext } from 'react';

//Utils
import { setFirstCapitalLetter } from 'utils';

import * as S from './Input.styled';

export const Input = ({ name, placeholder }: Props) => {
  const {
    formState: { errors },
    handleChange,
    handleBlur
  } = useContext(FormikLikeContext);
  const capitalLetterName = setFirstCapitalLetter(name);

  return (
    <>
      <S.Label>{capitalLetterName}</S.Label>
      <S.Input
        onChange={e => {
          handleChange(e);
        }}
        onBlur={e => handleBlur(e)}
        name={name}
        placeholder={placeholder || ''}
      />
      <S.ErrorDisplay>{errors[name]}</S.ErrorDisplay>
    </>
  );
};

interface Props {
  name: string;
  placeholder?: string;
}
