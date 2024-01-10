/* eslint-disable prettier/prettier */
import queries from './mutations';
import {useMutation} from '@apollo/client';

const useAddToCart = () => {
  const [addToCartMutation] = useMutation(queries.ADD_TO_CART);

  const handleAddToCart = async ({
    userId,
    productId,
    quantity,
  }: {
    userId: string;
    productId: string;
    quantity: number;
  }) => {
    try {
      const {data} = await addToCartMutation({
        variables: {
          userId,
          productId,
          quantity,
        },
      });

      // Access the updated user object with cart details
      const updatedUser = data?.addToCart;
      console.log('User after addToCart:', updatedUser);

      // You can return or do additional actions based on the response
      return updatedUser;
    } catch (error) {
      //   console.error('Error adding to cart:', error.message);
      // You can handle errors or return an error object
      const message = error instanceof Error ? error?.message : 'Unknown error';
      console.log('Error adding to cart:', message);
      return {error: message};
    }
  };

  return handleAddToCart;
};

export default useAddToCart;
