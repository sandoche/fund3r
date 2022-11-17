import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Alert, Button, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { AlertCircle } from 'tabler-icons-react';

import LoadingAnimation from '@/components/common/LoadingAnimation';
import useAccountSignature from '@/hooks/useAccountSignature';
import useDaoContract from '@/hooks/useDaoContract';
import { validateMilestoneNearTransactionHash } from '@/services/apiService';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function MilestoneProposalSubmission({ grantData, milestoneId }: { grantData: GrantApplicationInterface | null; milestoneId: number }) {
  const { t } = useTranslation('milestone');
  const router = useRouter();
  const { grantRequestSlug, errorCode, transactionHashes } = router.query;
  const { isNearLoading, submitProposal } = useDaoContract();
  const apiSignature = useAccountSignature();
  const milestoneNumber = milestoneId + 1;

  const submitGrantProposal = () => {
    submitProposal(grantData, grantData?.milestones[milestoneId]?.budget, milestoneNumber, grantData?.milestones[milestoneId]?.hashProposal);
  };

  const grantId = grantData?.id;

  const { isLoading, refetch: fetchValidateTransactionHash } = useQuery(
    ['validate-transaction-hash', apiSignature, grantId, milestoneId, transactionHashes],
    () => {
      return validateMilestoneNearTransactionHash(apiSignature, { grantId, milestoneId, proposalNearTransactionHash: transactionHashes });
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: () => {
        router.push(`/grants/${grantRequestSlug}`);
      },
    },
  );

  useEffect(() => {
    if (transactionHashes && apiSignature && typeof grantId !== 'undefined' && grantId >= 0 && milestoneId >= 0) {
      fetchValidateTransactionHash();
    }
  }, [transactionHashes, fetchValidateTransactionHash, apiSignature, grantId, milestoneId]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <Title mb="xl">{t('blockchain.title')}</Title>
      {errorCode && (
        <Alert icon={<AlertCircle size={16} />} title={t('error.tx_error.title')} color="orange" mb="xl">
          {t('error.tx_error.description')}
        </Alert>
      )}
      <Text mb="xl">{t('blockchain.description')}</Text>
      <Button type="submit" color="violet" disabled={isNearLoading} loading={isNearLoading} onClick={submitGrantProposal}>
        {t('blockchain.button')}
      </Button>
    </>
  );
}

export default MilestoneProposalSubmission;
