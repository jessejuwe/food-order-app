import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountValidity] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;

    // Guard Clause
    // prettier-ignore
    if (enteredAmount.trim().length === 0 || +enteredAmount < 1 || +enteredAmount > 5) {
      setAmountValidity(false);
      return;
    }

    props.onAddToCart(+enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={
          // prettier-ignore
          { id: `amount_${props.id}`, type: "number", min: '1', max: '5', step: '1', defaultValue: 1 }
        }
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Enter a valid number! (1 - 5)</p>}
    </form>
  );
};

export default MealItemForm;
