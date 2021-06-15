
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { nav } from '../constants';
import './nav.styles.scss';

const Nav = (props) => {
  const { location } = props;


  const [menu, updateMenu] = useState([...nav]);


  useEffect(() => {
    // updateNewMenu(location.pathname.replace("/", ""))
    const { pathname } = location;
    const newMenu = menu.map(
      (item) => ({ ...item, isClicked: item.link.toLowerCase() === pathname.toLowerCase() })
    );
    updateMenu(newMenu);
  }, []);

  const handleClick = (e) => {
    // updateNewMenu(e.target.text);
    const newMenu = menu.map(
      (item) => ({ ...item, isClicked: item.text === e.target.text })
    );
    updateMenu(newMenu);
  };

  return (
    <nav>
      <ul className="menu">
        {menu.map((item, index) => {
          return (
            <li
              className={`item ${item.isClicked ? 'active' : ''}`}
              key={index}
              onClick={handleClick}
              name={item.link}
            >
              <Link to={item.link}>{item.text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
