/* eslint-disable max-lines */
import axios from 'axios';
import type NearApiSignatureInterface from 'types/NearApiSignatureInterface';

import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import type MilestoneInterface from '@/types/MilestoneInterface';

const API_HOST = process.env.NEXT_PUBLIC_BACKEND_HOST;

const getAllGrantApplicationsOfUser = async (signature: NearApiSignatureInterface | undefined): Promise<GrantApplicationInterface[] | null> => {
  if (!signature) {
    return null;
  }

  const { data } = await axios.get(`${API_HOST}/api/v1/grants`, {
    headers: {
      'X-NEAR-ACCOUNT-ID': signature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
    },
  });

  return data;
};

const getGrantApplication = async (
  signature: NearApiSignatureInterface | undefined,
  grantId: number | string[] | string | undefined,
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  const { data } = await axios.get(`${API_HOST}/api/v1/grants/${grantId}`, {
    headers: {
      'X-NEAR-ACCOUNT-ID': signature.accountId,
      'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
    },
  });

  return data;
};

const saveGrantApplicationAsDraft = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    grantData,
    signObjectMessage,
  }: {
    grantId: number | undefined;
    grantData: GrantApplicationInterface;
    signObjectMessage: (stringMessage: unknown) => Promise<Uint8Array | undefined | null>;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  const signedGrantData = await signObjectMessage(grantData);

  const { data } = await axios.put(
    `${API_HOST}/api/v1/grants/${grantId}`,
    {
      grantData,
      signedGrantData,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitGrantApplication = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    grantData,
    signObjectMessage,
  }: {
    grantId: number | undefined;
    grantData: GrantApplicationInterface;
    signObjectMessage: (stringMessage: unknown) => Promise<Uint8Array | undefined | null>;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature) {
    return null;
  }

  await saveGrantApplicationAsDraft(signature, {
    grantId,
    grantData,
    signObjectMessage,
  });

  const signedGrantData = await signObjectMessage(grantData);

  const { data } = await axios.post(
    `${API_HOST}/api/v1/grants/${grantId}`,
    {
      grantData,
      signedGrantData,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const validateNearTransactionHash = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    proposalNearTransactionHash,
  }: {
    grantId: number | undefined;
    proposalNearTransactionHash: string | string[] | null | undefined;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature || !proposalNearTransactionHash) {
    return null;
  }

  const { data } = await axios.put(
    `${API_HOST}/api/v1/grants/${grantId}/near-transactions`,
    {
      proposalNearTransactionHash,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitCalendlyUrl = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    calendlyUrl,
    signStringMessage,
  }: {
    grantId: number | undefined;
    calendlyUrl: string | null | undefined;
    signStringMessage: (stringMessage: string) => Promise<Uint8Array | undefined | null>;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature || !calendlyUrl) {
    return null;
  }

  const signedCalendlyUrl = await signStringMessage(calendlyUrl);

  const { data } = await axios.put(
    `${API_HOST}/api/v1/grants/${grantId}/calendly/interview`,
    {
      grantId,
      calendlyUrl,
      signedCalendlyUrl,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitMilestoneCalendlyUrl = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    calendlyUrl,
    signStringMessage,
    milestoneId,
  }: {
    grantId: number | undefined;
    calendlyUrl: string | null | undefined;
    signStringMessage: (stringMessage: string) => Promise<Uint8Array | undefined | null>;
    milestoneId: number | undefined;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature || !calendlyUrl) {
    return null;
  }

  const signedCalendlyUrl = await signStringMessage(calendlyUrl);

  const { data } = await axios.put(
    `${API_HOST}/api/v1/grants/${grantId}/milestones/${milestoneId}/calendly/interview`,
    {
      grantId,
      milestoneId,
      calendlyUrl,
      signedCalendlyUrl,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitMilestoneData = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    milestoneId,
    milestoneData,
    signObjectMessage,
  }: {
    grantId: number | undefined;
    milestoneId: number | undefined;
    milestoneData: MilestoneInterface;
    signObjectMessage: (stringMessage: unknown) => Promise<Uint8Array | undefined | null>;
  },
) => {
  if (!signature) {
    return null;
  }

  const signedData = await signObjectMessage(milestoneData);

  const { data } = await axios.post(
    `${API_HOST}/api/v1/grants/${grantId}/milestones/${milestoneId}`,
    {
      milestoneId,
      signedData,
      milestoneData,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const submitFullMilestoneData = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    milestoneData,
    signObjectMessage,
  }: {
    grantId: number | undefined;
    milestoneId: number | undefined;
    milestoneData: MilestoneInterface;
    signObjectMessage: (stringMessage: unknown) => Promise<Uint8Array | undefined | null>;
  },
) => {
  if (!signature) {
    return null;
  }

  const signedData = await signObjectMessage(milestoneData);

  const { data } = await axios.post(
    `${API_HOST}/api/v1/grants/${grantId}/milestones`,
    {
      signedData,
      milestoneData,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

const validateMilestoneNearTransactionHash = async (
  signature: NearApiSignatureInterface | undefined,
  {
    grantId,
    milestoneId,
    proposalNearTransactionHash,
  }: {
    grantId: number | undefined;
    milestoneId: number | undefined;
    proposalNearTransactionHash: string | string[] | null | undefined;
  },
): Promise<GrantApplicationInterface | null> => {
  if (!signature || !proposalNearTransactionHash) {
    return null;
  }

  const { data } = await axios.put(
    `${API_HOST}/api/v1/grants/${grantId}/milestones/${milestoneId}/near-transactions`,
    {
      proposalNearTransactionHash,
    },
    {
      headers: {
        'X-NEAR-ACCOUNT-ID': signature.accountId,
        'X-NEAR-SIGNATURE': JSON.stringify(signature.signature),
      },
    },
  );

  return data;
};

export {
  getAllGrantApplicationsOfUser,
  getGrantApplication,
  saveGrantApplicationAsDraft,
  submitCalendlyUrl,
  submitFullMilestoneData,
  submitGrantApplication,
  submitMilestoneCalendlyUrl,
  submitMilestoneData,
  validateMilestoneNearTransactionHash,
  validateNearTransactionHash,
};
