import { Dispatch } from 'react';
import { addItemToCart } from '../redux/cartSlice';
import { Product } from '../types/product';

export const handleAddToCart = (
  dispatch: Dispatch<any>,
  product: Product | undefined
) => {
  if (product) {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        cover: product.cover,
        author: product.author,
        description: product.description,
      })
    );
  }
};
