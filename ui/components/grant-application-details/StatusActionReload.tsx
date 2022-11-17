import { Button, Paper, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function StatusActionReload({ action, loading }: { action: () => void; loading: boolean }) {
  const { t } = useTranslation('common');

  const onClick = () => {
    action();
  };

  return (
    <Paper shadow="sm" p="lg" radius="lg" mt="xl">
      <Text mb="sm">{t('errors.generic.message')}</Text>
      <Button color="violet" onClick={onClick} disabled={loading} loading={loading}>
        {t('errors.generic.button')}
      </Button>
    </Paper>
  );
}

export default StatusActionReload;
