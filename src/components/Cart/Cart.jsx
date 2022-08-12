import { Fragment, useContext, useState } from 'react';

import CartItem from './CartItem';
import Modal from '../UI/Modal';
import Checkout from './Checkout';

import CartContext from '../../context/cart-context';

const Cart = props => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [errorIsShown, setErrorIsShown] = useState(false);
  const [httpError, setHTTPError] = useState();

  const cartCTX = useContext(CartContext);

  const totalAmount = cartCTX.totalAmount.toFixed(2);

  const formatCur = (value, locale, currency) =>
    // prettier-ignore
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

  const formatedAmount = `${formatCur(totalAmount, navigator.language, 'GBP')}`;

  const hasItems = cartCTX.items.length > 0;

  const addItemHandler = item => cartCTX.addItem({ ...item, amount: 1 });

  const removeItemHandler = id => cartCTX.removeItem(id);

  const orderHandler = () => setIsCheckingOut(true);

  // submit cart data to backend
  const submitOrderHandler = async userData => {
    try {
      setIsSubmitting(true);

      const configObj = {
        method: 'POST',
        body: JSON.stringify({ user: userData, orderedItems: cartCTX.items }),
      };

      const response = await fetch(
        'https://react-food-order-app-b1cb0-default-rtdb.firebaseio.com/orders.json',
        configObj
      );

      if (!response.ok) throw new Error('Something went wrong!');

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCTX.clearCart();
    } catch (error) {
      setHTTPError(`💥 ${error.message} 💥`);
      setErrorIsShown(true);
    }
  };

  const hideErrorModalHandler = () => {
    setErrorIsShown(false);
  };

  if (errorIsShown) {
    return (
      <Modal onCloseCart={hideErrorModalHandler}>
        <section className="mealsError">
          <p className="prompt">{httpError}</p>
          <div className="cart-actions">
            <button className="button" onClick={hideErrorModalHandler}>
              Close
            </button>
          </div>
        </section>
      </Modal>
    );
  }

  const cartItems = (
    <ul className="cart-items">
      {cartCTX.items.map(item => (
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

  const btnGroup = (
    <div className="cart-actions">
      <button className="button--alt" onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className="button" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className="total">
        <span>Total Amount:</span>
        <span>{formatedAmount}</span>
      </div>
    </Fragment>
  );

  const isSubmittingModalContent = <p className="prompt">Sending order...</p>;

  const didSubmitModalContent = (
    <div className="success-message">
      <p className="order-success">Order Success!</p>
      <div className="cart-actions">
        <button className="button" onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </div>
  );

  const checkoutModalContext = (
    <Fragment>
      {isCheckingOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />
      )}

      {!isCheckingOut && btnGroup}
    </Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !didSubmit && !isCheckingOut && cartModalContent}
      {!isSubmitting && !didSubmit && checkoutModalContext}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
