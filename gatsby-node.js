/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const postTemplate = path.resolve('src/templates/post-template.jsx');

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate,
        context: {}, // additional data can be passed via context
      });
    });
  });
};

const socialImageLinks = {
  'github.png': 'https://github.com/Ricool06',
  'twitter.png': 'https://twitter.com/Ricool06',
};

exports.onCreateNode = ({ node, actions }) => {
  if (node.sourceInstanceName === 'images' && node.internal.type === 'File' && socialImageLinks[node.relativePath]) {
    const { createNode } = actions;

    createNode({
      id: uuidv4(),
      url: socialImageLinks[node.relativePath],
      file___NODE: node.id,
      internal: {
        type: 'socialJson',
        contentDigest: crypto
          .createHash('md5')
          .update(socialImageLinks[node.relativePath])
          .digest('hex'),
      },
    });
  }
};
