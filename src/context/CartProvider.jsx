import React, { useReducer } from 'react';

import CartContext from './cart-context';

// Default Cart State
const defaultCartState = { items: [], totalAmount: 0 };

// Cart Reducer function, logic for validation
const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    // prettier-ignore
    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

    // prettier-ignore
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      // prettier-ignore
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // .concat() is not mutating the array "items" in the current state
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'REMOVE_ITEM') {
    // prettier-ignore
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

    const existingItem = state.items[existingCartItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      // Remove entire item from Cart
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      // Leave item in cart, but decrease the amount
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === 'CLEAR') return defaultCartState;

  return defaultCartState;
};

const CartProvider = props => {
  // prettier-ignore
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItem = item => {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };

  const removeItem = id => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  };

  const clearCart = () => dispatchCartAction({ type: 'CLEAR' });

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
