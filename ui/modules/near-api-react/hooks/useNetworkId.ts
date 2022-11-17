import { useContext } from 'react';

import NearContext from '../context/NearContext';

/**
 * Get the NEAR connection object from the context.
 */
const useNetworkId = () => {
  const context = useContext(NearContext);

  if (context === undefined) {
    throw new Error(`useNetworkId must be used within a NearProvider`);
  }

  const { networkId } = context;

  return networkId;
};

export default useNetworkId;
