import React from 'react';
import { Divider, Group, Space, Title } from '@mantine/core';
import * as dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import FeedbackComment from '@/components/common/FeedbackComment';
import LabelValue from '@/components/common/LabelValue';

import type { FormList } from '@mantine/form/lib/form-list/form-list';

function DetailsMilestones({
    milestones,
    currency,
}: {
    milestones: FormList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null; reviewMilestone?: string | null }> | undefined;
    currency: string | undefined;
}) {
    const { t } = useTranslation('grant');

    if (!milestones) {
        return <span />;
    }

    const milestonesComponents = milestones.map((milestone, index) => {
        return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
                <Divider mt="xl" mb="xl" />
                <div>
                    <Title order={4} mb="lg">
                        {t('details.project.milestone.title', { number: index + 1 })}
                    </Title>
                    {milestone.reviewMilestone && <FeedbackComment comment={milestone.reviewMilestone} />}
                    <Group>
                        <LabelValue label={t('details.project.milestone.budget')} value={`${milestone.budget?.toFixed(0)} ${currency}`} />
                        <Divider sx={{ height: '42px' }} orientation="vertical" />
                        <LabelValue label={t('details.project.milestone.date')} value={dayjs.default(milestone.deliveryDate).format('ddd, MMM D, YYYY')} />
                    </Group>
                    <Space h="md" />
                    <LabelValue label={t('details.project.milestone.description')} value={milestone.description} />
                </div>
            </React.Fragment>
        );
    });

    return (
        <div>
            {milestonesComponents}
            <Divider mt="xl" mb="xl" />
        </div>
    );
}

export default DetailsMilestones;
