import React from 'react';

import { StaticQuery } from 'gatsby';
import renderer from 'react-test-renderer';
import { render, cleanup } from 'react-testing-library';
import Image, { PureImage } from '../../src/components/image';

describe('Image', () => {
  const filePath = 'liontraceroar.png';
  const data = {
    image: {
      childImageSharp: {
        fluid: {
          src: filePath,
          aspectRatio: 1,
          srcSet: filePath,
          sizes: '(max-width: 300px) 100vw, 300px',
        },
      },
    },
  };

  afterEach(cleanup);

  it('should render the image at the path specified', () => {
    const { container } = render(<PureImage data={data} />);
    expect(container.querySelector('img')).toHaveAttribute('src', filePath);
  });

  it('should match the snapshot', () => {
    StaticQuery.mockImplementation(({ render: mockRender }) => mockRender(data));

    const jsonSnapshot = renderer.create(<Image filePath={filePath} />).toJSON();
    expect(jsonSnapshot).toMatchSnapshot();
  });
});
