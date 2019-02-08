import React from 'react';

const gatsby = jest.requireActual('gatsby');

module.exports = {
  ...gatsby,
  graphql: jest.fn(queryString => queryString),
  Link: jest.fn().mockImplementation(({ to, ...rest }) => React.createElement('a', {
    ...rest,
    href: to,
  })),
  StaticQuery: jest.fn(),
};
