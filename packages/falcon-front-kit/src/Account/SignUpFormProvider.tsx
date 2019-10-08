import React from 'react';
import { Formik } from 'formik';
import { useGetUserError } from '@deity/falcon-data';
import { useSignUpMutation } from '@deity/falcon-shop-data';
import { FormProviderProps } from '../Forms';

export type SignUpFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  autoSignIn: boolean;
};
export type SignUpFormProviderProps = FormProviderProps<SignUpFormValues>;
export const SignUpFormProvider: React.SFC<SignUpFormProviderProps> = props => {
  const { onSuccess, initialValues, ...formikProps } = props;
  const defaultInitialValues: SignUpFormValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    autoSignIn: true
  };

  const [signUp] = useSignUpMutation();
  const [getUserError] = useGetUserError();

  return (
    <Formik
      initialValues={initialValues || defaultInitialValues}
      onSubmit={(values, formikActions) =>
        signUp({ variables: { input: values } })
          .then(() => {
            formikActions.setSubmitting(false);
            return onSuccess && onSuccess();
          })
          .catch(e => {
            formikActions.setSubmitting(false);
            formikActions.setStatus({ error: getUserError(e) });
          })
      }
      {...formikProps}
    />
  );
};
