import { useContext } from "react";

import CartItem from "./CartItem";
import Modal from "../UI/Modal";

import CartContext from "../../context/cart-context";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCTX = useContext(CartContext);

  const totalAmount = cartCTX.totalAmount.toFixed(2);

  const formatCur = (value, locale, currency) =>
    // prettier-ignore
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

  const formatedAmount = `${formatCur(totalAmount, navigator.language, "GBP")}`;

  const hasItems = cartCTX.items.length > 0;

  const addItemHandler = (item) => cartCTX.addItem({ ...item, amount: 1 });

  const removeItemHandler = (id) => cartCTX.removeItem(id);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCTX.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{formatedAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
