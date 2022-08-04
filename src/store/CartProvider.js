import React, { useReducer } from 'react';
import CartContext from './cart-context';

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updateItems;

      if (existingCartItem) {
        const updateItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updateItems = [...state.items];
        updateItems[existingCartItemIndex] = updateItem;
      } else {
        updateItems = state.items.concat(action.item);
      }

      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    }

    case 'REMOVE_ITEM': {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      let existingCartItem = state.items[existingCartItemIndex];

      let updateTotalAmount = state.totalAmount - existingCartItem.price;

      let updateItems;

      if (existingCartItem.amount === 1) {
        updateItems = state.items.filter((item) => item.id !== action.id);
      } else {
        updateItems = [...state.items];
        updateItems[existingCartItemIndex] = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
      }

      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    }

    case 'CLEAR': {
      return initialState;
    }

    default:
      return initialState;
  }
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' });
  };

  const cartcontext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartcontext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
