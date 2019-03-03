import React from 'react';
import renderer from 'react-test-renderer';
import { render, cleanup } from 'react-testing-library';
import Header from '../../src/components/header';

jest.mock('../../src/components/social-links.jsx', () => 'div');

describe('Header', () => {
  afterEach(cleanup);

  it('should have correct header text, set by title', () => {
    const { container } = render(<Header siteTitle={'Ricool\'s Blog'} />);

    expect(container.textContent).toBe('Ricool\'s Blog');
  });

  it('should match snapshot', () => {
    const jsonSnapshot = renderer.create(<Header siteTitle={'Ricool\'s Blog'} />).toJSON();
    expect(jsonSnapshot).toMatchSnapshot();
  });
});
