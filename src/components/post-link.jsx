import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  .post-content {
    color: grey;
  }

  a {
    text-decoration: none;
  }

  h2 {
    transition: all .12s ease-in-out;
  }

  a:hover h2 {
    color: grey;
  }
`;

export default function PostLink({ post }) {
  const { excerpt, frontmatter: { title, date } } = post;

  return (
    <Wrapper>
      <Link to={post.frontmatter.path}>
        <h2>{title}</h2>
        <div className="post-content">
          <h4>{date}</h4>
          <p>{excerpt}</p>
        </div>
        <hr />
      </Link>
    </Wrapper>
  );
}

PostLink.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      path: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
