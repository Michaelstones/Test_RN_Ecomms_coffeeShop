/* eslint-disable prettier/prettier */
import {useQuery, useMutation, ApolloError} from '@apollo/client';
import {YOUR_QUERY, YOUR_MUTATION} from './your-graphql-queries';

// Define the expected variables for your query
type QueryVariables = {
  // Replace 'YourQueryVariablesType' with the actual type
  // that represents the expected variables for your query
  // (e.g., { id: string })
  variables: YourQueryVariablesType;
};

// Define the expected variables for your mutation
type MutationVariables = {
  // Replace 'YourMutationVariablesType' with the actual type
  // that represents the expected variables for your mutation
  // (e.g., { input: { ... } })
  variables: YourMutationVariablesType;
};

// Define the expected result of your query
type QueryResult = {
  loading: boolean;
  error?: ApolloError;
  // Replace 'YourQueryResultType' with the actual type
  // that represents the expected result of your query
  data?: any;
};

// Define the expected result of your mutation
type MutationResult = {
  performMutation?: (variables: MutationVariables) => Promise<any>;
  loading: boolean;
  error?: ApolloError;
  // Replace 'YourMutationResultType' with the actual type
  // that represents the expected result of your mutation
  data?: any;
};

// Hook for custom queries
export const useCustomQuery = (variables?: QueryVariables): QueryResult => {
  const {loading, error, data} = useQuery<QueryResult>(YOUR_QUERY, {
    variables: variables?.variables,
    fetchPolicy: 'network-only',
  });

  return {
    loading,
    error,
    data,
  };
};

// Hook for custom mutations
export const useCustomMutation = (): MutationResult => {
  const [mutateFunction, {loading, error, data}] = useMutation<MutationResult>(YOUR_MUTATION);

  // Function to perform the mutation with specified variables
  const performMutation = async (variables: MutationVariables): Promise<any> => {
    try {
      const result = await mutateFunction({variables: variables.variables});
      return result.data;
    } catch (error) {
      console.error('GraphQL Mutation Error:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return message;
    }
  };

  return {
    loading,
    error,
    data,
    performMutation,
  };
};
