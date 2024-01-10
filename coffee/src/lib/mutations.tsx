/* eslint-disable prettier/prettier */
import {gql} from '@apollo/client';

const queries = {
  CREATE_USER: gql`
    mutation CreateUser($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        id
        email
      }
    }
  `,
  ADD_TO_CART: gql`
    mutation addToCart($userId: ID!, $productId: String!, $quantity: Int!) {
      addToCart(userId: $userId, productId: $productId, quantity: $quantity) {
        id
        cart {
          product {
            id
            name
          }
          quantity
        }
      }
    }
  `,
};

export default queries;
