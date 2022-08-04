import React, { Fragment, useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CheckOut from './CheckOut';

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${Math.abs(cartCtx.totalAmount).toFixed(2)}`;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartitems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={() => cartItemAddHandler(item)}
          onRemove={() => cartItemRemoveHandler(item.id)}
        />
      ))}
    </ul>
  );

  const checkOutHandler = (e) => {
    e.preventDefault();
    setIsCheckOut(true);
  };

  const confirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      'https://react-http-8333c-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'appilcation/json',
        },
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setDidSubmit(true);
    setIsSubmitting(false);

    cartCtx.clearCart();
  };

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {cartCtx.items.length > 0 && (
        <button className={classes.button} onClick={checkOutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartitems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onConfirm={confirmHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = (
    <Fragment>
      <p>Sending data ...</p>
    </Fragment>
  );

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully send data.</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !didSubmit && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
