import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import { PureImage } from './image';

export const PureSocialLinks = ({ data }) => {
  const children = data.allSocialJson.edges.map((edge) => {
    const { node } = edge;
    const { url } = node;
    return (
      <div
        key={url}
        style={{
          width: 50,
          marginLeft: 1,
        }}
      >
        <a href={url}>
          <PureImage data={node} />
        </a>
      </div>
    );
  });

  return (
    <>
      {children}
    </>
  );
};

PureSocialLinks.propTypes = {
  data: PropTypes.shape({
    allSocialJson: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          url: PropTypes.string.isRequired,
          image: PropTypes.any.isRequired,
        }).isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

const SocialLinks = props => (
  <StaticQuery
    query={graphql`
      query {
        allSocialJson {
          edges {
            node {
              url
              image: file {
                childImageSharp {
                  id
                  fluid(maxWidth: 50) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <PureSocialLinks {...props} data={data} />}
  />
);

export default SocialLinks;
