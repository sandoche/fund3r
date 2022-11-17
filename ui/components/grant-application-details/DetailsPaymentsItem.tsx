import { useState } from 'react';
import { Button, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import * as dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import useAccountSignature from '@/hooks/useAccountSignature';
import { downloadFile } from '@/services/invoiceService';
import type { PaymentInterface } from '@/types/GrantApplicationInterface';

function DetailsPaymentsItem({ payment, index, grantId }: { payment: PaymentInterface; index: number; grantId: number | undefined }) {
  const { t } = useTranslation('grant');
  const apiSignature = useAccountSignature();
  const [isLoading, setIsLoading] = useState(false);

  const loadAndDownload = async () => {
    setIsLoading(true);
    await downloadFile(apiSignature, grantId, index);
    setIsLoading(false);
  };

  return (
    <Paper shadow="xs" radius="md" p="lg" mt="lg">
      <SimpleGrid cols={2}>
        <Title order={4} mb="lg">
          {t('details.payments.payment.title')} #{payment.milestoneNumber}
        </Title>
        <Text align="right">{t(`details.payments.payment.statuses.${payment.status}`)}</Text>
        <Text>{dayjs.default(payment.date).format('ddd, MMM D, YYYY')}</Text>
        <div />
        <Text style={{ paddingTop: 8 }}>
          {t('details.payments.payment.amount')}{' '}
          <strong>
            {payment.amount} {payment.currency}
          </strong>
        </Text>
        <Text align="right">
          <Button variant="light" color="purple" onClick={loadAndDownload} loading={isLoading} disabled={isLoading}>
            {t('details.payments.payment.download')}
          </Button>
        </Text>
      </SimpleGrid>
    </Paper>
  );
}

export default DetailsPaymentsItem;
