import { SimpleGrid, Spoiler } from '@mantine/core';
import * as dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import FeedbackComment from '@/components/common/FeedbackComment';
import LabelValue from '@/components/common/LabelValue';

function DetailsProject({
  projectDescription,
  fundingAmount,
  currency,
  projectLaunchDate,
  projectUrl,
  githubUrl,
  reviewProject,
}: {
  projectDescription: string | undefined;
  fundingAmount: number | undefined;
  currency: string | undefined;
  projectLaunchDate: Date | string | undefined;
  projectUrl: string | undefined;
  githubUrl: string | undefined;
  reviewProject: string | undefined;
}) {
  const { t } = useTranslation('grant');

  return (
    <>
      {reviewProject && <FeedbackComment comment={reviewProject} />}
      <Spoiler mb="xl" maxHeight={120} showLabel={t('details.common.show_more')} hideLabel={t('details.common.show_less')}>
        {projectDescription}
      </Spoiler>
      <SimpleGrid cols={2}>
        <LabelValue label={t('details.project.requested')} value={`${fundingAmount?.toFixed(0)} ${currency}`} />
        <LabelValue label={t('details.project.launch')} value={dayjs.default(projectLaunchDate).format('ddd, MMM D, YYYY')} />
        <LabelValue label={t('details.project.project-url')} value={projectUrl} />
        <LabelValue label={t('details.project.github-url')} value={githubUrl} />
      </SimpleGrid>
    </>
  );
}

export default DetailsProject;
