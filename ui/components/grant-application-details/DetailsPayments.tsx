import { Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import DetailsPaymentsItem from '@/components/grant-application-details/DetailsPaymentsItem';
import type { PaymentInterface } from '@/types/GrantApplicationInterface';

function DetailsPayments({ payments, grantId }: { payments: PaymentInterface[] | undefined; grantId: number | undefined }) {
  const { t } = useTranslation('grant');

  if (!payments) {
    return null;
  }

  if (payments.length === 0) {
    return <Text align="center">{t('details.payments.zero')}</Text>;
  }

  const paymentsItems = payments.map((payment, index) => {
    // eslint-disable-next-line no-underscore-dangle
    return <DetailsPaymentsItem key={payment._id} payment={payment} index={index} grantId={grantId} />;
  });

  return <div>{paymentsItems}</div>;
}

export default DetailsPayments;
