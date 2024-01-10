/* eslint-disable prettier/prettier */
import {gql} from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($first: Int, $skip: Int) {
    getAllProducts(first: $first, skip: $skip) {
      id
      name
      description
      roasted
      imagelink_square
      imagelink_portrait
      ingredients
      special_ingredient
      prices {
        size
        price
        currency
      }
      average_rating
      ratings_count
      favourite
      type
      index
    }
  }
`;

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      # Add other user fields you want to retrieve
    }
  }
`;
