import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-faded">
      <IndexLink to="/" activeClassName="active" className="navbar-brand">Home</IndexLink>
      {" | "}
      <Link to="/Contacts" activeClassName="active" className="navbar-brand">Contacts</Link>
    </nav>

  );
};



export default Header;
