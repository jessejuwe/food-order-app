import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../context/cart-context';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [btnBump, setBtnBump] = useState(false);
  const cartCTX = useContext(CartContext);

  // prettier-ignore
  const numberOfCartItems = cartCTX.items.reduce((cur, item) => cur + item.amount, 0);

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`;

  useEffect(() => {
    // Guard Clause
    if (cartCTX.items.length === 0) return;

    setBtnBump(true);

    const timeout = setTimeout(() => setBtnBump(false), 300);

    // Cleanup function
    return () => clearTimeout(timeout);
  }, [cartCTX.items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
