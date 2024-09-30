'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addItemToCart, removeItemFromCart } from '../redux/cartSlice';
import CartItemComponent from '../components/CartItemComponent';
import { useRouter } from 'next/navigation';
import { handleBackClick } from '../utils/navigation';
const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

  const handleAddItem = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(addItemToCart({ ...item, quantity: 1 }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className="container mx-auto py-10">
      <h1
        onClick={() => handleBackClick(router)}
        className="text-2xl font-bold mb-8 cursor-pointer hover:underline"
      >
        &lt; Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              handleAddItem={handleAddItem}
              handleRemoveItem={handleRemoveItem}
            />
          ))}

          <div className="mt-8 text-right">
            <h2 className="text-md sm:text-xl font-bold">Total: {totalAmount.toFixed(2)} $</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
