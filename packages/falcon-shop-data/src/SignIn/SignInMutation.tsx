import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { SignInInput } from '@deity/falcon-shop-extension';
import { OperationInput } from '../types';

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input)
  }
`;

export type SignInResponse = { signIn: boolean };

export class SignInMutation extends Mutation<SignInResponse, OperationInput<SignInInput>> {
  static defaultProps = {
    mutation: SIGN_IN_MUTATION,
    refetchQueries: ['MiniAccount', 'Cart', 'CustomerWithAddresses', 'Customer']
  };
}
