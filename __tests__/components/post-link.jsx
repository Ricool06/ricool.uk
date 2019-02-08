import React from 'react';
import { render, cleanup } from 'react-testing-library';
import PostLink from '../../src/components/post-link';

describe('PostLink', () => {
  const post = {
    excerpt: 'The start of some blog entry...',
    frontmatter: {
      date: '2019-02-08',
      title: 'My first blog post',
      path: '/my-first-blog-post',
    },
  };

  let link;

  afterEach(cleanup);

  beforeEach(() => {
    const { container } = render(<PostLink post={post} />);
    link = container.querySelector('a');
  });

  it('should contain a link to the post path', () => {
    expect(link).toHaveAttribute('href', post.frontmatter.path);
  });

  it('should contain the post date and title in a header', () => {
    const { frontmatter: { title, date } } = post;
    const linkHeader = link.querySelector('h2');
    const linkSubtitle = link.querySelector('h4');
    expect(linkHeader).toHaveTextContent(title);
    expect(linkSubtitle).toHaveTextContent(date);
  });

  it('should contain an excerpt of the start of the blog post', () => {
    const { excerpt } = post;
    const linkExcerpt = link.querySelector('p');
    expect(linkExcerpt).toHaveTextContent(excerpt);
  });
});
