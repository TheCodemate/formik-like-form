import {
  ChangeEvent,
  FocusEvent,
  createContext,
  useState,
  SyntheticEvent
} from 'react';

//Types
import {
  DynamicObjectType,
  IFormikLikeContextConfig,
  IFormState
} from 'index.d';

//Context
export const FormikLikeContext = createContext<IFormikLikeContextConfig>(
  {} as IFormikLikeContextConfig
);

//Main component
export const FormikLikeForm = ({
  children,
  onSubmit,
  initialValues,
  validationSchema
}: Props) => {
  const [formState, setFormState] = useState<IFormState>({
    values: { ...initialValues },
    touched: {},
    errors: {}
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = e;

    const { error, errorMsg } =
      validationSchema[name as keyof typeof validationSchema](value);
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value
      },
      errors: {
        ...prev.errors,
        [name]: error ? errorMsg : ''
      }
    }));

    setIsSubmitting(error);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      touched: {
        ...prev.touched,
        [e.target.name]: true
      }
    }));
  };
  return (
    <FormikLikeContext.Provider
      value={{
        setIsSubmitting,
        isSubmitting,
        formState,
        handleChange,
        handleBlur,
        onSubmit
      }}
    >
      {children(isSubmitting)}
    </FormikLikeContext.Provider>
  );
};

//Interfaces & types
interface Props {
  children: (isSubmitting: boolean) => JSX.Element;
  onSubmit: (e: SyntheticEvent<HTMLInputElement>) => void;
  initialValues: DynamicObjectType;
  validationSchema: {
    email: (value: any) => { error: boolean; errorMsg: string };
    password: (value: any) => { error: boolean; errorMsg: string };
  };
}
