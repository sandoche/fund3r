import { Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

function MilestoneStatusActionSubmit({
  number,
  grantRequestSlug,
  currentMilestone,
}: {
  number: number;
  grantRequestSlug: string | string[] | undefined;
  currentMilestone: number;
}) {
  const { t } = useTranslation('grant');

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.milestones.waiting-submit.message', { number })}</Text>
      <Link href={`/grants/${grantRequestSlug}/milestones/${currentMilestone}`} passHref>
        <Button component="a" color="violet">
          {t('details.milestones.waiting-submit.button', { number })}
        </Button>
      </Link>
    </Paper>
  );
}

export default MilestoneStatusActionSubmit;
