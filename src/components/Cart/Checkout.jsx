import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

// HELPER FUNCTIONS
const isEmpty = value => value.trim().length === 0;
const isFiveChars = value => value.trim().length === 6;

const Checkout = props => {
  const [formInputsValidty, setFormInputsValidty] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalcodeInputRef = useRef();
  const cityInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    // FORM VALIDATION
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidty({
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

    //   Guard Clause
    if (!formIsValid) return;

    // Pass data to Cart component
    const data = {
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    };

    props.onConfirm(data);

    // CLEAR FORM
    nameInputRef.current.value = '';
    streetInputRef.current.value = '';
    postalcodeInputRef.current.value = '';
    cityInputRef.current.value = '';
  };

  //   prettier-ignore
  const nameClassName = `${classes.control} ${!formInputsValidty.name ? classes.invalid : ''}`;

  //   prettier-ignore
  const streetClassName = `${classes.control} ${!formInputsValidty.street ? classes.invalid : ''}`;

  //   prettier-ignore
  const pCodeClassName = `${classes.control} ${!formInputsValidty.postalCode ? classes.invalid : ''}`;

  //   prettier-ignore
  const cityControlClassName = `${classes.control} ${!formInputsValidty.city ? classes.invalid : ''}`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={nameClassName}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidty.name && <p>Enter your name</p>}
      </div>

      <div className={streetClassName}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidty.street && <p>Enter a valid street</p>}
      </div>

      <div className={pCodeClassName}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalcodeInputRef} />
        {!formInputsValidty.postalCode && <p>Enter a valid postal code</p>}
      </div>

      <div className={cityControlClassName}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidty.city && <p>Enter your city</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
