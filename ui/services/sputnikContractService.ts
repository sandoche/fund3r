import { getTokenId } from '@/config/currency';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import type SputnikContractInterface from '@/types/SputnikContractInterface';
import createProposalDescription from '@/utilities/createProposalDescription';

const createPayoutProposal = async (
  contract: SputnikContractInterface,
  grantData: GrantApplicationInterface,
  fundingAmount: number,
  payoutNumber: number,
  networkId: string,
  hash: string,
) => {
  const projectDescription = payoutNumber === 0 ? grantData.projectDescription : `Milestone ${payoutNumber} - ${grantData.milestones[payoutNumber - 1].description}`;
  const description = createProposalDescription(grantData.projectName || '', payoutNumber, projectDescription || '', hash.slice(0, 8));

  if (contract.get_policy && contract.add_proposal) {
    const policy = await contract.get_policy();

    contract.add_proposal(
      {
        proposal: {
          description,
          kind: {
            Transfer: {
              token_id: getTokenId(networkId),
              receiver_id: grantData.nearId,
              amount: BigInt((fundingAmount || 0) * 10 ** 18).toString(),
            },
          },
        },
      },
      '30000000000000',
      policy.proposal_bond.toString(),
    );
  }
};

// eslint-disable-next-line import/prefer-default-export
export { createPayoutProposal };
