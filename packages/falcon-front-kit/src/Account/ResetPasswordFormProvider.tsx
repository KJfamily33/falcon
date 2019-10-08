import React from 'react';
import { Formik } from 'formik';
import { useGetUserError } from '@deity/falcon-data';
import { ResetPasswordInput } from '@deity/falcon-shop-extension';
import { useResetPasswordMutation } from '@deity/falcon-shop-data';
import { FormProviderProps } from '../Forms';

export type ResetPasswordFormValues = ResetPasswordInput;
export type ResetPasswordFormProviderProps = FormProviderProps<ResetPasswordFormValues>;
export const ResetPasswordFormProvider: React.SFC<ResetPasswordFormProviderProps> = props => {
  const { onSuccess, initialValues, ...formikProps } = props;
  const defaultInitialValues: ResetPasswordFormValues = {
    resetToken: '',
    password: ''
  };

  const [resetPassword] = useResetPasswordMutation();
  const [getUserError] = useGetUserError();

  return (
    <Formik
      initialValues={initialValues || defaultInitialValues}
      onSubmit={(values, formikActions) =>
        resetPassword({ variables: { input: values } })
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
