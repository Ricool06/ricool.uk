import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

export default function PostLink({ post }) {
  const { frontmatter: { title, date } } = post;

  return (
    <div>
      <Link to={post.frontmatter.path}>
        {`${title} ${date}`}
      </Link>
    </div>
  );
}

PostLink.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
