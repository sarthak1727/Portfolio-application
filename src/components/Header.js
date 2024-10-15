// components/Header.js
import React from 'react';
import '../Assests/Css/Header.css';

const Header = ({ showMyWorks }) => (
  <header className="header">
    <nav>
      {showMyWorks && <span className="title">My Works</span>} {/* Conditionally render title */}
    </nav>
  </header>
);

export default Header;
