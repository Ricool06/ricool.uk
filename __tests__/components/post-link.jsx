import React from 'react';
import { render, cleanup } from 'react-testing-library';
import PostLink from '../../src/components/post-link';

describe('PostLink', () => {
  const post = {
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

  it('should contain the post date and title in the text', () => {
    const { frontmatter: { title, date } } = post;
    expect(link).toHaveTextContent(`${title} ${date}`);
  });
});
