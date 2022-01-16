import {
  ChangeEvent,
  createContext,
  FocusEvent,
  useState,
  SyntheticEvent
} from 'react';

//Types
import {
  DynamicObjectType,
  IFormikLikeContextConfig,
  IFormState,
  ValidationSchemaType
} from 'types';

//Context
export const FormikLikeContext = createContext<IFormikLikeContextConfig>(
  {} as IFormikLikeContextConfig
);

//Main component
export const FormikLikeForm = ({
  children,
  initialValues,
  onSubmit,
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
        formState,
        handleChange,
        handleBlur,
        isSubmitting,
        onSubmit,
        setIsSubmitting
      }}
    >
      {children(isSubmitting)}
    </FormikLikeContext.Provider>
  );
};

//Interfaces & types
interface Props {
  initialValues: DynamicObjectType;
  validationSchema: ValidationSchemaType;
  children: (isSubmitting: boolean) => JSX.Element;
  onSubmit: (e: SyntheticEvent<HTMLInputElement>) => void;
}
