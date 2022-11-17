import { setupWorker } from 'msw';

import handlers from './handlers';

// Setup a worker for the dev environment (browser)
// eslint-disable-next-line import/prefer-default-export
export const worker = setupWorker(...handlers);
