import { useContext } from 'react';

import NearContext from '../context/NearContext';

/**
 * Get the NEAR wallet connection object from the context.
 */
const useWallet = () => {
  const context = useContext(NearContext);

  if (context === undefined) {
    throw new Error(`useWallet must be used within a NearProvider`);
  }

  const { wallet } = context;

  return wallet;
};

export default useWallet;
