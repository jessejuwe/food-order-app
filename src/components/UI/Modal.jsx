import { Fragment } from 'react';
import ReactDOM from 'react-dom';

// prettier-ignore
const Backdrop = props => <div className='backdrop' onClick={props.onCloseCart}/>;

const ModalOverlay = props => (
  <div className="modal">
    <div className="content">{props.children}</div>
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
