import React from 'react';

import { StaticQuery } from 'gatsby';
import renderer from 'react-test-renderer';
import { render, cleanup } from 'react-testing-library';
import SocialLinks, { PureSocialLinks } from '../../src/components/social-links';

describe('SocialLinks', () => {
  const data = {
    allSocialJson: {
      edges: [
        {
          node: {
            url: 'https://github.com/Ricool06',
            image: {
              childImageSharp: {
                id: 'af470c94-725d-50fd-937f-2d9729f0d809',
                fluid: {
                  originalName: 'github.png',
                  aspectRatio: 1,
                  src: '/static/472739dfb5857b1f659f4c4c6b4568d0/d7cee/github.png',
                  srcSet: '/static/472739dfb5857b1f659f4c4c6b4568d0/d7cee/github.png',
                  sizes: '(max-width: 300px) 100vw, 300px',
                },
              },
            },
          },
        },
        {
          node: {
            url: 'https://twitter.com/Ricool06',
            image: {
              childImageSharp: {
                id: '65e9f256-76cb-5750-9963-fb2d50c89627',
                fluid: {
                  originalName: 'twitter.png',
                  aspectRatio: 1,
                  src: '/static/d73d21cfc1df81e923d62e220e790022/045aa/twitter.png',
                  srcSet: '/static/d73d21cfc1df81e923d62e220e790022/045aa/twitter.png',
                  sizes: '(max-width: 300px) 100vw, 300px',
                },
              },
            },
          },
        },
      ],
    },
  };

  afterEach(cleanup);

  it('should render all images with links passed to it', () => {
    const { container } = render(<PureSocialLinks data={data} />);
    const images = container.querySelectorAll('img');
    const links = container.querySelectorAll('a');

    expect(links).toHaveLength(2);
    expect(images).toHaveLength(2);

    images.forEach((image, key) => expect(image).toHaveAttribute('src', data.allSocialJson.edges[key].node.image.childImageSharp.fluid.src));
    links.forEach((link, key) => expect(link).toHaveAttribute('href', data.allSocialJson.edges[key].node.url));
  });


  it('should match the snapshot', () => {
    StaticQuery.mockImplementation(({ render: mockRender }) => mockRender(data));

    const jsonSnapshot = renderer.create(<SocialLinks />).toJSON();
    expect(jsonSnapshot).toMatchSnapshot();
  });
});
