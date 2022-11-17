import { useEffect, useMemo, useState } from 'react';
import type { Near } from 'near-api-js';
import { connect, WalletConnection } from 'near-api-js';

import getConfig from '../config';
import NearContext from '../context/NearContext';

const NearProvider = ({ children, networkId = 'testnet' }: { children: JSX.Element; networkId: string }) => {
  const [near, setNear] = useState<Near | null>(null);
  const [wallet, setWallet] = useState<WalletConnection | null>(null);

  useEffect(() => {
    async function connectNear() {
      const config = getConfig(networkId);
      const nearConnection = await connect(config);
      setNear(nearConnection);
      setWallet(new WalletConnection(nearConnection, 'fund3r-wallet'));
    }
    connectNear().catch(console.error);
  }, [networkId]);

  const isConnected = Boolean(near && wallet);

  const contextValue = useMemo(() => ({ near, wallet, networkId }), [near, wallet, networkId]);

  return <NearContext.Provider value={contextValue}>{isConnected && children}</NearContext.Provider>;
};

export default NearProvider;
