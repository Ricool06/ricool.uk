import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `StaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.app/gatsby-image
 * - `StaticQuery`: https://gatsby.app/staticquery
 */

export const PureImage = ({ data }) => (
  <Img fluid={data.image.childImageSharp.fluid} />
);

PureImage.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.any.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

const Image = props => (
  <StaticQuery
    query={graphql`
        query {
          image: file(relativePath: { eq: "gatsby-astronaut.png" }) {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
    render={data => <PureImage {...props} data={data} />}
  />
);

Image.propTypes = {
  filePath: PropTypes.string.isRequired,
};

export default Image;
