import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import './header.styles.scss';

const Header = () => {
  return (
    <div className="headerContainer">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <p>Thirukkural - Learn</p>
    </div>
  );
};

export default Header;
