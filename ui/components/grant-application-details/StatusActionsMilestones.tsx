import { Alert, Button, Paper, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import * as dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import MilestoneStatusActionInterviewBooking from '@/components/grant-application-details/MilestoneStatusActionInterviewBooking';
import MilestoneStatusActionSubmit from '@/components/grant-application-details/MilestoneStatusActionSubmit';
import StatusActionMilestoneOnTheGo from '@/components/grant-application-details/StatusActionMilestoneOnTheGo';
import { ALLOW_MILESTONES_ON_THE_GO, DEMO_MODE } from '@/config/grants';
import { MILESTONE_STATUS, useMilestonesStatus } from '@/hooks/useMilestonesStatus';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

function StatusActionsMilestones({ grant, setGrant }: { grant: GrantApplicationInterface | undefined; setGrant: (data: GrantApplicationInterface) => void }) {
  const router = useRouter();
  const { t } = useTranslation('grant');
  const { grantRequestSlug } = router.query;

  const { currentMilestone, milestonesStatus } = useMilestonesStatus();

  if (!milestonesStatus) {
    return null;
  }

  if (milestonesStatus.length === 0 && ALLOW_MILESTONES_ON_THE_GO) {
    return <StatusActionMilestoneOnTheGo grantRequestSlug={grantRequestSlug} />;
  }

  if (milestonesStatus.length === 0) {
    return null;
  }

  const { status, dateInterview } = milestonesStatus[currentMilestone];
  const number = currentMilestone + 1;

  const { STARTED, PARTLY_SUBMITTED, INTERVIEW_NOT_SCHEDULED, SUBMIT, REJECTED } = MILESTONE_STATUS;

  if (status === STARTED) {
    return <MilestoneStatusActionSubmit number={number} grantRequestSlug={grantRequestSlug} currentMilestone={currentMilestone} />;
  }

  if (status === PARTLY_SUBMITTED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.milestones.waiting-blockchain.message')}</Text>
        <Link href={`/grants/${grantRequestSlug}/milestones/${currentMilestone}`} passHref>
          <Button component="a" color="violet">
            {t('details.milestones.waiting-blockchain.button', { number })}
          </Button>
        </Link>
      </Paper>
    );
  }

  if (status === INTERVIEW_NOT_SCHEDULED) {
    return <MilestoneStatusActionInterviewBooking grant={grant} setGrant={setGrant} milestoneId={currentMilestone} />;
  }

  if (status === SUBMIT) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.milestones.submitted.message', { number })}</Text>
        <Text>{dayjs.default(dateInterview).format('ddd, MMM D, YYYY - HH:mm')}</Text>
        {DEMO_MODE && (
          <Alert icon={<IconAlertCircle size={16} />} title={t('details.status-actions.agreement-partially-signed.demo.title')} color="cyan" mt="lg">
            {t('details.status-actions.agreement-partially-signed.demo.description')}
          </Alert>
        )}
      </Paper>
    );
  }

  if (status === REJECTED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.milestones.rejection.message')}</Text>
        </Paper>
        <MilestoneStatusActionSubmit number={number} grantRequestSlug={grantRequestSlug} currentMilestone={currentMilestone} />
      </>
    );
  }

  if (ALLOW_MILESTONES_ON_THE_GO) {
    return <StatusActionMilestoneOnTheGo grantRequestSlug={grantRequestSlug} />;
  }

  return null;
}

export default StatusActionsMilestones;
