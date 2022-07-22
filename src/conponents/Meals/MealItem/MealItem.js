import React from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const { name, description, price } = props;
  const priceConvert = `$ ${price.toFixed(2)}`;
  return (
    <div className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{priceConvert}</div>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </div>
  );
};

export default MealItem;
