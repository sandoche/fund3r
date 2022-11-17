import { SimpleGrid, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import FeedbackComment from '@/components/common/FeedbackComment';
import LabelValue from '@/components/common/LabelValue';

import type { FormList } from '@mantine/form/lib/form-list/form-list';

function DetailsMember({
    github,
    twitter,
    reviewMemberDetail,
    teamMembers,
}: {
    github: string | undefined;
    twitter: string | undefined;
    reviewMemberDetail: string | undefined;
    teamMembers: FormList<{ githubUrl?: string }> | undefined;
}) {
    const { t } = useTranslation('grant');

    const teamMembersComponents = teamMembers?.map((teamMember, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <LabelValue key={index} label={t('form.team.label', { number: index + 1 })} value={teamMember.githubUrl} />;
    });

    return (
        <>
            <Title order={3} mb="lg" mt="xl">
                {t('details.member.title')}
            </Title>
            {reviewMemberDetail && <FeedbackComment comment={reviewMemberDetail} />}
            <SimpleGrid cols={2}>
                <LabelValue label={t('form.github.label')} value={github} />
                <LabelValue label={t('form.twitter.label')} value={twitter} />
                {teamMembersComponents}
            </SimpleGrid>
        </>
    );
}

export default DetailsMember;
