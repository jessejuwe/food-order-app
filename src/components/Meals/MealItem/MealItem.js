import { useContext } from "react";
import CartContext from "../../../context/cart-context";

import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCTX = useContext(CartContext);

  const formatCur = (value, locale, currency) =>
    // prettier-ignore
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

  const price = `${props.price.toFixed(2)}`;
  const formatedPrice = `${formatCur(price, navigator.language, "GBP")}`;

  const addToCartHandler = (amount) =>
    // prettier-ignore
    cartCTX.addItem({ id: props.id, name: props.name, amount, price: props.price });

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{formatedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
