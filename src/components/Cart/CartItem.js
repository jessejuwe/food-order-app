import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = props.price.toFixed(2);

  const formatCur = (value, locale, currency) =>
    // prettier-ignore
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

  const formatedPrice = `${formatCur(price, navigator.language, "GBP")}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{formatedPrice}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
