const getNearConfig = (keyStore, networkId = 'testnet') => ({
  keyStore,
  networkId,
  nodeUrl: `https://rpc.${networkId}.near.org`,
  walletUrl: networkId === 'testnet' ? `https://testnet.mynearwallet.com` : `https://app.mynearwallet.com`,
  helperUrl: `https://helper.${networkId}.near.org`,
  headers: {},
});

module.exports = getNearConfig;
