export const DEFAULT_CURRENCY = 'USN';

export const getTokenId = (networkId = 'testnet') => {
  const tokenConfig = new Map([
    ['testnet', 'usdn.testnet'],
    ['mainnet', 'usn'],
  ]);

  return tokenConfig.get(networkId);
};
