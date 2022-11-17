import { APP_NAME } from '@/constants';

const createProposalDescription = (name: string, payoutNumber: number, projectDescription: string, hash: string): string => {
  return `[${APP_NAME} - Grant Request] ${name} #${payoutNumber} | ${projectDescription} | ${hash}`;
};

export default createProposalDescription;
