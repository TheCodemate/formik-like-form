//components
import { Form, FormikLikeForm, Input } from 'components';
import { ValidationSchemaType } from 'types';

//utils
import { Validator } from 'utils';

//consts
const validate = new Validator();
const validationSchema: ValidationSchemaType = {
  email: (value: any) => validate.toCheck(value).isEmail().build(),
  password: (value: any) => validate.toCheck(value).isPassword().build()
};

function App() {
  return (
    <FormikLikeForm
      initialValues={{ email: '', password: '' }}
      onSubmit={values => console.log('APP - onSubmit', values)}
      validationSchema={validationSchema}
    >
      {(isSubmitting: boolean) => (
        <Form>
          <Input name="email" />
          <Input name="password" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </FormikLikeForm>
  );
}

export default App;
