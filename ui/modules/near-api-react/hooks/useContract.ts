import { Contract } from 'near-api-js';

import useWallet from './useWallet';

interface ContractConfigInterface {
  contractId: string;
  contractMethods: {
    viewMethods: string[];
    changeMethods: string[];
  };
}

/**
 * Create a new contract object from the NEAR wallet object given the id and methods of
 * the smart contract.
 *
 * @param {Object} contractConfig The smart contract configuration.
 * @param {string} contractConfig.contractId The id of the smart contract.
 * @param {Object} contractConfig.contractMethods The methods of the smart contract.
 * @param {string[]} contractConfig.contractMethods.viewMethods The view methods of the smart contract.
 * @param {string[]} contractConfig.contractMethods.changeMethods The change methods of the smart contract.
 */
const useContract = ({ contractId, contractMethods: { viewMethods, changeMethods } }: ContractConfigInterface) => {
  const wallet = useWallet();

  return (
    wallet &&
    new Contract(wallet.account(), contractId, {
      viewMethods,
      changeMethods,
    })
  );
};

export default useContract;
