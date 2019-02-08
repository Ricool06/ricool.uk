import React from 'react';
import { render, cleanup } from 'react-testing-library';
import renderer from 'react-test-renderer';
import { StaticQuery } from 'gatsby';
import PurePostTemplate from '../../src/templates/post-template';

describe('PostTemplate', () => {
  const staticQueryData = {
    site: {
      siteMetadata: {
        title: 'Ricool\'s Blog',
        description: 'making things all day',
        author: 'Ricool06',
      },
    },
  };

  afterEach(cleanup);

  it('should have correct header text, set by title', () => {
    StaticQuery.mockImplementationOnce(({ render: mockRender }) => mockRender(staticQueryData));

    const data = {
      markdownRemark: {
        frontmatter: {
          title: 'My First Blog Post',
          date: '2019-26-01',
          html: '<p>This is the blog content</p>',
        },
      },
    };
    const { container } = render(<PurePostTemplate data={data} />);

    const headers = container.querySelectorAll('h1');
    const date = container.querySelector('h2');

    expect(headers[0].textContent).toBe(staticQueryData.site.siteMetadata.title);
    expect(headers[1].textContent).toBe(data.markdownRemark.frontmatter.title);
    expect(date.textContent).toBe(data.markdownRemark.frontmatter.date);
  });

  it('should have a correctly configured StaticQuery component for default export', () => {
    StaticQuery.mockImplementationOnce(({ render: mockRender }) => mockRender(staticQueryData));

    const data = {
      markdownRemark: {
        frontmatter: {
          title: 'My First Blog Post',
          date: '2019-26-01',
          html: '<p>This is the blog content</p>',
        },
      },
    };
    const jsonSnapshot = renderer.create(<PurePostTemplate data={data} />).toJSON();

    expect(jsonSnapshot).toMatchSnapshot();
  });
});
