import { ReactNode, useContext } from 'react';
import { FormikLikeContext } from 'components/FormikLikeForm/FormikLikeForm';

import * as S from './Form.styled';

export const Form = ({ children }: Props) => {
  const { onSubmit, formState } = useContext(FormikLikeContext);
  return (
    <>
      <S.Form
        onSubmit={e => {
          onSubmit(formState.values);
        }}
      >
        {children}
      </S.Form>
    </>
  );
};

interface Props {
  children: ReactNode | ReactNode[];
}
