import { Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

function StatusActionMilestoneOnTheGo({ grantRequestSlug }: { grantRequestSlug: string | string[] | undefined }) {
  const { t } = useTranslation('grant');

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('details.milestones.on-the-go.message')}</Text>
      <Link href={`/grants/${grantRequestSlug}/milestones/new`} passHref>
        <Button component="a" color="violet">
          {t('details.milestones.on-the-go.button')}
        </Button>
      </Link>
    </Paper>
  );
}

export default StatusActionMilestoneOnTheGo;
