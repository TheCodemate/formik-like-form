import { ReactNode, useContext } from 'react';
import { FormikLikeContext } from 'components/FormikLikeForm/FormikLikeForm';

export const Form = ({ children }: FormProps) => {
  const { onSubmit, formState } = useContext(FormikLikeContext);
  return (
    <>
      <form
        onSubmit={() => {
          onSubmit(formState.values);
        }}
      >
        {children}
      </form>
    </>
  );
};

interface FormProps {
  children: ReactNode | ReactNode[];
}
