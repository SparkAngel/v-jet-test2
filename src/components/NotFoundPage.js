import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="error404">
    <h1 className="error404__h1">Page not found</h1>
    <NavLink to="/" exact className="error404__navlink">
      Click to  HomePage
    </NavLink>
  </div>
);

export default NotFoundPage;
