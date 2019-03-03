module.exports = {
  pathPrefix: '/ricool.uk',
  siteMetadata: {
    title: 'Ricool\'s Blog',
    description: 'making things all day',
    author: 'Ricool06',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Ricool\'s blog',
        short_name: 'Ricool',
        start_url: '/',
        background_color: '#339988',
        theme_color: '#339988',
        display: 'minimal-ui',
        icon: 'src/images/liontraceroar.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'markdown-pages',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-styled-components',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
