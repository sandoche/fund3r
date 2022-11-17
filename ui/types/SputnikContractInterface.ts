import type { Contract } from 'near-api-js';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface SputnikInterface {
  add_proposal?: (arg0: any, arg1: any, arg2: any) => any;
  get_policy?: () => any;
}

type SputnikContractInterface = Contract & SputnikInterface;

export default SputnikContractInterface;
