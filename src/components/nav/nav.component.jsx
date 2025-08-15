import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { nav } from '../constants';
import './nav.styles.scss';

const Nav = (props) => {
  const { location } = props;
  const [menu, updateMenu] = useState([...nav]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add icons to menu items
  const getIcon = (text) => {
    switch (text.toLowerCase()) {
      case 'home': return '🏠';
      case 'thirukurral': return '📖';
      case 'practice': return '✍️';
      default: return '📄';
    }
  };

  useEffect(() => {
    const { pathname } = location;
    const newMenu = menu.map(
      (item) => ({ ...item, isClicked: item.link.toLowerCase() === pathname.toLowerCase() })
    );
    updateMenu(newMenu);
  }, [location]);

  const handleClick = (e, item) => {
    const newMenu = menu.map(
      (menuItem) => ({ ...menuItem, isClicked: menuItem.text === item.text })
    );
    updateMenu(newMenu);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Mobile menu button */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation menu */}
        <ul className={`menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {menu.map((item, index) => {
            return (
              <li
                className={`item ${item.isClicked ? 'active' : ''}`}
                key={index}
              >
                <Link
                  to={item.link}
                  onClick={(e) => handleClick(e, item)}
                  className="nav-link"
                >
                  <span className="nav-icon">{getIcon(item.text)}</span>
                  <span className="nav-text">{item.text}</span>
                  <span className="nav-indicator"></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
