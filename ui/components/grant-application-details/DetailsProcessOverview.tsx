import { Paper, Text, Timeline, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { Check, Clock } from 'tabler-icons-react';

import { SKIP_EVALUATION_APPROVAL, SKIP_ONBOARDING } from '@/config/grants';
import { useGrantStatus } from '@/hooks/useGrantStatus';

function DetailsProcessOverview() {
  const { t } = useTranslation('grant');
  const { step, pendingStep } = useGrantStatus();

  const getIcon = (timelineStep: number) => {
    if (timelineStep === pendingStep) {
      return <Clock size={12} />;
    }

    if (step >= timelineStep) {
      return <Check size={12} />;
    }

    return null;
  };

  return (
    <>
      <Title order={2} mb="lg">
        {t('details.process-overview.title')}
      </Title>

      <Paper shadow="0" p="lg" radius="lg" withBorder mb="xl">
        <Timeline active={step} bulletSize={24} lineWidth={2} color="violet">
          <Timeline.Item bullet={getIcon(0)} title={t('details.process-overview.submit.title')} />
          <Timeline.Item bullet={getIcon(1)} title={t('details.process-overview.evaluation-approval.title')}>
            {!SKIP_EVALUATION_APPROVAL && (
              <Text color="dimmed" size="sm">
                {t('details.process-overview.evaluation-approval.description')}
              </Text>
            )}
          </Timeline.Item>
          <Timeline.Item bullet={getIcon(2)} title={t('details.process-overview.acceptance.title')}>
            <Text color="dimmed" size="sm">
              {t('details.process-overview.acceptance.description')}
            </Text>
          </Timeline.Item>
          <Timeline.Item bullet={getIcon(3)} title={t('details.process-overview.kyc.title')} />
          <Timeline.Item bullet={getIcon(4)} title={t('details.process-overview.agreement.title')} />
          <Timeline.Item bullet={getIcon(5)} title={t('details.process-overview.on-chain-submission.title')} />
          <Timeline.Item bullet={getIcon(6)} title={t('details.process-overview.payout.title')} />
          <Timeline.Item bullet={getIcon(7)} title={t('details.process-overview.onboarding.title')}>
            <Text color="dimmed" size="sm">
              {SKIP_ONBOARDING ? t('details.process-overview.onboarding.description-skip') : t('details.process-overview.onboarding.description')}
            </Text>
          </Timeline.Item>
        </Timeline>
      </Paper>
    </>
  );
}

export default DetailsProcessOverview;
