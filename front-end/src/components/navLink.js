import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavLink({ to, testid, text }) {
  return (
    <Link
      to={ to }
      data-testid={ testid }
    >
      { text }
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavLink;
