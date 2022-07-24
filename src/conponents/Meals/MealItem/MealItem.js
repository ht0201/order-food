import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const { id, name, description, price } = props;
  const priceConvert = `$ ${price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);

  const addToCartItems = (amount) => {
    cartCtx.addItem({
      id,
      name,
      price,
      amount,
    });
  };
  return (
    <div className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{priceConvert}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addToCartItems={addToCartItems} />
      </div>
    </div>
  );
};

export default MealItem;
