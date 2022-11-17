import { setupServer } from 'msw/node';

import handlers from './handlers';

// Setup a worker for the test environment (Node)
// eslint-disable-next-line import/prefer-default-export
export const server = setupServer(...handlers);
