import { useEffect, useState } from 'react';
import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import StatusActionReload from '@/components/grant-application-details/StatusActionReload';
import useHellosignEmbedded from '@/modules/hellosign-embedded-react/useHellosignEmbedded';

function StatusActionKycApproved({
  helloSignRequestUrl,
  refetchGrant,
  dateAgreementSignatureGrantReceiver,
}: {
  helloSignRequestUrl: string | undefined;
  refetchGrant: unknown;
  dateAgreementSignatureGrantReceiver: Date | undefined;
}) {
  const { t } = useTranslation('grant');
  const clientId = process.env.NEXT_PUBLIC_HELLO_SIGN_APP_CLIENT_ID;
  const { open, hellosignClient, isLoading, error, setError } = useHellosignEmbedded(helloSignRequestUrl, clientId);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [polling, setPolling] = useState(false);

  hellosignClient?.on('sign', () => {
    setRefreshLoading(true);
    setPolling(true);
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (polling) {
      interval = setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refetchGrant();

        if (dateAgreementSignatureGrantReceiver) {
          setRefreshLoading(false);
          setPolling(false);
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [dateAgreementSignatureGrantReceiver, polling, refetchGrant]);

  const reloadAction = () => {
    setRefreshLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    refetchGrant().then(() => {
      setError(null);
      setRefreshLoading(false);
    });
  };

  const loading = isLoading || refreshLoading;

  if (error) {
    return <StatusActionReload action={reloadAction} loading={loading} />;
  }

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.kyc-approved.message')}</Text>
      <Button color="violet" onClick={open} loading={loading} disabled={loading}>
        {t('details.status-actions.kyc-approved.button')}
      </Button>
    </Paper>
  );
}

export default StatusActionKycApproved;
