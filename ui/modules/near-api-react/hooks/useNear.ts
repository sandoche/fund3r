import { useContext } from 'react';

import NearContext from '../context/NearContext';

/**
 * Get the NEAR connection object from the context.
 */
const useNear = () => {
  const context = useContext(NearContext);

  if (context === undefined) {
    throw new Error(`useNear must be used within a NearProvider`);
  }

  const { near } = context;

  return near;
};

export default useNear;
