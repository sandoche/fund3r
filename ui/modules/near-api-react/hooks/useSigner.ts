import { useCallback } from 'react';

import useNear from './useNear';
import useNetworkId from './useNetworkId';
import useWallet from './useWallet';

/**
 * Get the signer in order to sign transactions or messages
 */
const useSigner = () => {
  const near = useNear();
  const wallet = useWallet();
  const networkId = useNetworkId();

  const signer = near?.connection.signer;
  const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

  const signStringMessage = useCallback(
    async (stringMessage: string): Promise<Uint8Array | undefined | null> => {
      if (signer) {
        const byteMessage = Buffer.from(stringMessage);
        const signature = await signer.signMessage(byteMessage, accountId, networkId);
        const signedMessage = signature?.signature;

        return signedMessage;
      } else {
        return null;
      }
    },
    [signer, accountId, networkId],
  );

  const signObjectMessage = async (message: unknown) => {
    const stringMessage = JSON.stringify(message);
    const signedMessage = await signStringMessage(stringMessage);
    return signedMessage;
  };

  return { signer, signObjectMessage, signStringMessage };
};

export default useSigner;
