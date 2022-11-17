import { Divider, Paper, SimpleGrid, Text, Timeline } from '@mantine/core';
import type { FormList } from '@mantine/form/lib/form-list/form-list';
import * as dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { Check } from 'tabler-icons-react';

import { DEFAULT_CURRENCY } from '@/config/currency';
import type { PaymentInterface } from '@/types/GrantApplicationInterface';
import budgetCalculator from '@/utilities/budgetCalculator';

function PaymentSchedule({
  milestones,
  fundingAmount,
  currency = DEFAULT_CURRENCY,
  projectLaunchDate,
  payments,
}: {
  milestones: FormList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }> | undefined;
  fundingAmount: number | undefined;
  currency: string | undefined;
  projectLaunchDate: Date | string | undefined;
  payments: PaymentInterface[] | undefined;
}) {
  const { t } = useTranslation('grant');

  const timelineItems = milestones?.map((milestone, index) => {
    const { budget, deliveryDate } = milestone;

    return (
      <Timeline.Item
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        bullet={payments && payments[index + 1] && payments[index + 1].status === 'paid' && <Check />}
        title={t('details.project.milestone.title', { number: index + 1 })}
      >
        <SimpleGrid cols={2}>
          <Text color="dimmed" size="sm">
            {dayjs.default(deliveryDate).format('ddd, MMM D, YYYY')}
          </Text>
          <Text color="dimmed" size="sm" align="right">
            {budget || 0} {currency}
          </Text>
        </SimpleGrid>
      </Timeline.Item>
    );
  });

  // to replace by an utility function

  const initialBudget = fundingAmount || 0;
  const totalFundingAmount = budgetCalculator(fundingAmount, milestones);

  const numberOfPayouts = payments && payments.length > 0 ? payments.length - 1 : 0;

  return (
    <Paper shadow="0" p="lg" radius="lg" withBorder mt="xl">
      <Timeline active={numberOfPayouts} bulletSize={24} lineWidth={2} color="violet">
        <Timeline.Item bullet={payments && payments[0] && payments[0].status === 'paid' && <Check />} title={t('details.payment-schedule.launch')}>
          <SimpleGrid cols={2}>
            <Text color="dimmed" size="sm">
              {dayjs.default(projectLaunchDate).format('ddd, MMM D, YYYY')}
            </Text>
            <Text color="dimmed" size="sm" align="right">
              {initialBudget} {currency}
            </Text>
          </SimpleGrid>
        </Timeline.Item>
        {timelineItems}
      </Timeline>
      <Divider mt="md" mb="md" />
      <SimpleGrid cols={2}>
        <Text weight="bold">{t('details.payment-schedule.total')}</Text>
        <Text color="dimmed" size="sm" align="right">
          {totalFundingAmount || 0} {currency}
        </Text>
      </SimpleGrid>
    </Paper>
  );
}

export default PaymentSchedule;
