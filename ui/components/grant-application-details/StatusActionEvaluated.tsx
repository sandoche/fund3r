import { useState } from 'react';
import { PopupButton, useCalendlyEventListener } from 'react-calendly';
import { useQuery } from 'react-query';
import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import useAccountSignature from '@/hooks/useAccountSignature';
import useSigner from '@/modules/near-api-react/hooks/useSigner';
import { submitCalendlyUrl } from '@/services/apiService';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function StatusActionEvaluated({
  id,
  email,
  firstname,
  lastname,
  setGrant,
}: {
  id: number | undefined;
  email: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  setGrant: (data: GrantApplicationInterface) => void;
}) {
  const { t } = useTranslation('grant');
  const { signStringMessage } = useSigner();
  const apiSignature = useAccountSignature();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL_APPLICATION;
  const [eventUrl, setEventUrl] = useState(null);

  const prefilledData = {
    email,
    name: `${firstname} ${lastname}`,
  };

  const { isLoading, refetch } = useQuery(
    ['submit-calendly-url', apiSignature, id, eventUrl],
    () => {
      return submitCalendlyUrl(apiSignature, { grantId: id, calendlyUrl: eventUrl, signStringMessage });
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (updatedGrantData) => {
        if (updatedGrantData) {
          setGrant(updatedGrantData);
        }
      },
    },
  );

  useCalendlyEventListener({
    onEventScheduled: (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setEventUrl(e.data.payload.event.uri);
      setTimeout(() => {
        refetch();
      }, 1);
    },
  });

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.status-actions.evaluated.message')}</Text>
      {typeof window !== 'undefined' && calendlyUrl && (
        <Button<typeof PopupButton>
          color="violet"
          component={PopupButton}
          url={calendlyUrl}
          rootElement={document.getElementById('__next') as HTMLElement}
          text={t('details.status-actions.evaluated.button')}
          prefill={prefilledData}
          loading={isLoading}
          disabled={isLoading}
        />
      )}
    </Paper>
  );
}

export default StatusActionEvaluated;
