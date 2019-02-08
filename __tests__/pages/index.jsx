import React from 'react';

import { StaticQuery } from 'gatsby';
import renderer from 'react-test-renderer';
import IndexPage from '../../src/pages/index';

describe('IndexPage', () => {
  const staticQueryData = {
    site: {
      siteMetadata: {
        title: 'Ricool\'s Blog',
        description: 'making things all day',
        author: 'Ricool06',
      },
    },
  };

  it('should have a correctly configured StaticQuery component for default export', () => {
    StaticQuery.mockImplementation(({ render: mockRender }) => mockRender(staticQueryData));

    const data = {
      allMarkdownRemark: {
        edges: [
          {
            node: {
              id: 'c34acf72-ec77-5252-8e8e-61d030108cbb',
              excerpt: 'The start of some blog entry...',
              frontmatter: {
                date: 'February 10, 2019',
                path: '/work-based-learning-week-1',
                title: 'My first blog post',
              },
            },
          },
          {
            node: {
              id: 'c34acf72-ec77-5252-8e8e-61d0aaaaaaaa',
              excerpt: 'The start of some other blog entry...',
              frontmatter: {
                date: 'February 11, 2019',
                path: '/work-based-learning-week-2',
                title: 'My second blog post',
              },
            },
          },
        ],
      },
    };
    const jsonSnapshot = renderer.create(<IndexPage data={data} />).toJSON();

    expect(jsonSnapshot).toMatchSnapshot();
  });
});
