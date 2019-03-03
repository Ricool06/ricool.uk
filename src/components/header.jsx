import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import SocialLinks from './social-links';

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: '#339988',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
        display: 'flex',
      }}
    >
      <h1
        style={{
          margin: 0,
          flex: '1 1 auto',
        }}
      >
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <SocialLinks />
    </div>
  </div>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
