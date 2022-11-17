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
    walletUrl: `https://wallet.${networkId}.near.org`,
    helperUrl: `https://helper.${networkId}.near.org`,
    headers: {},
  };
};

export default getConfig;
