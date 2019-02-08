import { render, cleanup } from 'react-testing-library';
import Header from '../../src/components/header';

describe('Header', () => {
  afterEach(cleanup);

  it('should have correct header text, set by title', () => {
    const { container } = render(Header({ siteTitle: 'Ricool\'s Blog' }));

    expect(container.textContent).toBe('Ricool\'s Blog');
  });
});
