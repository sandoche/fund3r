import { Button, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { MILESTONE_STATUS, useMilestonesStatus } from '@/hooks/useMilestonesStatus';

function MilestoneError({ milestoneId, previousMilestoneNotSubmitted }: { milestoneId: number; previousMilestoneNotSubmitted: boolean }) {
  const { t } = useTranslation('milestone');
  const { milestonesStatus } = useMilestonesStatus();
  const router = useRouter();
  const { grantRequestSlug } = router.query;

  const milestoneNumber = milestoneId + 1;

  const status = milestonesStatus && milestonesStatus[milestoneId] && milestonesStatus[milestoneId].status;

  return (
    <div>
      <Title mb="lg">{t('form.title', { number: milestoneNumber })}</Title>
      <Text mb="lg">
        {status && previousMilestoneNotSubmitted && t('error.previous_not_submitted.description')}
        {!status && t('error.not_found.description')}
        {status === MILESTONE_STATUS.ERROR && t('error.generic.description')}
        {(status === MILESTONE_STATUS.SUBMIT || status === MILESTONE_STATUS.REVIEW || status === MILESTONE_STATUS.PAYOUT || status === MILESTONE_STATUS.REJECTED) &&
          t('error.already.description')}
      </Text>
      <Link href={`/grants/${grantRequestSlug}`} passHref>
        <Button component="a" color="violet">
          {t('error.button')}
        </Button>
      </Link>
    </div>
  );
}

export default MilestoneError;
