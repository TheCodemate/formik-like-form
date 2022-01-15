// export interface IDynamicObject {
// [key: string]: any;
// }

export type IDynamicObject = Record<string, string>;

export type DynamicObjectType = Record<string, any>;

export interface IFormState {
  values: DynamicObjectType;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
}

export interface IFormikLikeContextConfig {
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  isSubmitting: boolean;
  formState: IFormState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  onSubmit: (e: SyntheticEvent<HTMLInputElement>) => void;
}

export type ValidateType = (
  e: SyntheticEvent<HTMLInputElement>,
  values: DynamicObjectType,
  setErrors: (valueName: string, errorMessage: string) => void
) => void;
