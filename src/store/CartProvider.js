import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updateItems = state.items.concat(action.item);
      const updateTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updateItems,
        totalAmount: updateTotalAmount,
      };
    }
    default:
      return initialState;
  }
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item });
  };
  const removeItemHandler = (id) => {};
  const cartcontext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartcontext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
