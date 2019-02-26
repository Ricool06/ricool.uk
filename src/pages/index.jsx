import React from 'react';

import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import PostLink from '../components/post-link';

export default function IndexPage({ data: { allMarkdownRemark: { edges } } }) {
  const PostLinks = edges.map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <SEO title="Home" keywords={['Ricool', 'Ricool06', 'UK', 'developer', 'blog', 'gatsby']} />
      <div>{PostLinks}</div>
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            id: PropTypes.string.isRequired,
            excerpt: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`;
