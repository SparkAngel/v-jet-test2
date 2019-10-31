import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <nav className="header-nav">
      <Link
        to="/"
        className="header-nav_a"
      >
        Home
      </Link>
      <Link
        to="/movies"
      >
        Movies
      </Link>
    </nav>
  </header>
);

export default Header;
