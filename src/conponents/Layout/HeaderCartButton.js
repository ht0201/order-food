import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setIsBtnHighlighted(true);

    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  let numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    isBtnHighlighted ? classes.bump : ''
  }`;

  return (
    <div className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your card</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </div>
  );
};

export default HeaderCartButton;
