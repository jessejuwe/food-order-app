import React, { Fragment } from 'react';

// Import assets
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
  return (
    <Fragment>
      <header className="header">
        <h1 className="heading">Food Globe</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className="main-image">
        <img src={mealsImage} alt="meals" />
      </div>
    </Fragment>
  );
};

export default Header;
