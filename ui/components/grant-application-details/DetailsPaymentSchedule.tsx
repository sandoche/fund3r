import { Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import PaymentSchedule from '@/components/common/PaymentSchedule';
import type { PaymentInterface } from '@/types/GrantApplicationInterface';

import type { FormList } from '@mantine/form/lib/form-list/form-list';

function DetailsPaymentSchedule({
    milestones,
    fundingAmount,
    currency,
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

    return (
        <>
            <Title order={2}>{t('details.payment-schedule.title')}</Title>
            <PaymentSchedule milestones={milestones} fundingAmount={fundingAmount} currency={currency} projectLaunchDate={projectLaunchDate} payments={payments} />
        </>
    );
}

export default DetailsPaymentSchedule;
