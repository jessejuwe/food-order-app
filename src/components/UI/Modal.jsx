import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

// prettier-ignore
const Backdrop = props => <div className={classes.backdrop} onClick={props.onCloseCart}/>;

const ModalOverlay = props => (
  <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
);

const portalElements = document.getElementById('overlays');

const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onCloseCart={props.onCloseCart} />,
        portalElements
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElements
      )}
    </Fragment>
  );
};

export default Modal;
