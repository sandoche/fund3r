import { Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import PaymentSchedule from '@/components/common/PaymentSchedule';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormSummary({ data }: { data: any }) {
  const { t } = useTranslation('grant');

  return (
    <>
      <Title order={2} mb="sm">
        {t('summary.schedule.title')}
      </Title>
      <PaymentSchedule milestones={data?.milestones} fundingAmount={data?.fundingAmount} currency={data?.currency} projectLaunchDate={data?.projectLaunchDate} payments={[]} />
    </>
  );
}

export default FormSummary;
