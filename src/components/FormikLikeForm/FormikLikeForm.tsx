import { ChangeEvent, createContext, FocusEvent, useState } from 'react';

import {
  DynamicObjectType,
  IFormikLikeContextConfig,
  IFormState,
  ValidationSchemaType
} from 'types';

export const FormikLikeContext = createContext<IFormikLikeContextConfig>(
  {} as IFormikLikeContextConfig
);

export const FormikLikeForm = ({
  children,
  initialValues,
  onSubmit,
  validationSchema
}: FormikLikeFormProps) => {
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

interface FormikLikeFormProps {
  initialValues: DynamicObjectType;
  validationSchema: ValidationSchemaType;
  children: (isSubmitting: boolean) => JSX.Element;
  onSubmit: (values: DynamicObjectType) => void;
}
