import { ConnectConfig, keyStores } from 'near-api-js';

/**
 * Function that returns a NEAR connection configuration object based on the given networkId.
 *
 * @param  {string} networkId='testnet'
 * @return {object}
 */
const getConfig = (networkId = 'testnet'): ConnectConfig => {
  return {
    keyStore: new keyStores.BrowserLocalStorageKeyStore(),
    networkId,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: networkId === 'testnet' ? `https://testnet.mynearwallet.com` : `https://app.mynearwallet.com`,
    helperUrl: `https://helper.${networkId}.near.org`,
    headers: {},
  };
};

export default getConfig;
