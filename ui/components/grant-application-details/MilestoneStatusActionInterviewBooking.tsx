import { useState } from 'react';
import { PopupButton, useCalendlyEventListener } from 'react-calendly';
import { useQuery } from 'react-query';
import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import useAccountSignature from '@/hooks/useAccountSignature';
import useSigner from '@/modules/near-api-react/hooks/useSigner';
import { submitMilestoneCalendlyUrl } from '@/services/apiService';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function MilestoneStatusActionInterviewBooking({
  milestoneId,
  grant,
  setGrant,
}: {
  milestoneId: number | undefined;
  grant: GrantApplicationInterface | undefined;
  setGrant: (data: GrantApplicationInterface) => void;
}) {
  const { t } = useTranslation('grant');
  const { signStringMessage } = useSigner();
  const apiSignature = useAccountSignature();
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL_MILESTONES;
  const [eventUrl, setEventUrl] = useState(null);

  const { id: grantId, email, firstname, lastname } = grant || {};

  const prefilledData = {
    email,
    name: `${firstname} ${lastname}`,
  };

  const { isLoading, refetch } = useQuery(
    ['submit-milestone-calendly-url', apiSignature, milestoneId, grantId, eventUrl],
    () => {
      return submitMilestoneCalendlyUrl(apiSignature, { grantId, calendlyUrl: eventUrl, signStringMessage, milestoneId });
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (updatedMilestoneData) => {
        if (updatedMilestoneData) {
          const data = {
            ...grant,
          };

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data.milestones[milestoneId] = updatedMilestoneData;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setGrant(data);
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
      <Text mb="sm">{t('details.milestones.waiting-booking.message')}</Text>
      {typeof window !== 'undefined' && calendlyUrl && (
        <Button<typeof PopupButton>
          color="violet"
          component={PopupButton}
          url={calendlyUrl}
          rootElement={document.getElementById('__next') as HTMLElement}
          text={t('details.milestones.waiting-booking.button')}
          prefill={prefilledData}
          loading={isLoading}
          disabled={isLoading}
        />
      )}
    </Paper>
  );
}

export default MilestoneStatusActionInterviewBooking;
