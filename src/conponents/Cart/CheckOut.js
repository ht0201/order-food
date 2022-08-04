import { useState, useRef } from 'react';

import classes from './CheckOut.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    console.log(formInputValidity);

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) return;

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  const nameControlClasses = formInputValidity.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const streetControlClasses = formInputValidity.street
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const postalCodeControlClasses = formInputValidity.postalCode
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  const cityControlClasses = formInputValidity.city
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && (
          <p className={classes['error-text']}>Enter name is valid !</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && (
          <p className={classes['error-text']}>Enter street is valid !</p>
        )}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal-code'>Postal Code</label>
        <input type='text' id='postal-code' ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && (
          <p className={classes['error-text']}>Enter postalCode is 5 chars !</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && (
          <p className={classes['error-text']}>Enter city is valid !</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOut;
