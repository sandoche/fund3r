import { Paper, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import FeedbackComment from '@/components/common/FeedbackComment';

function DetailsAttachment({ reviewAttachments, attachment }: { reviewAttachments: string | undefined; attachment: string | undefined }) {
  const { t } = useTranslation('grant');

  return (
    <>
      {reviewAttachments && <FeedbackComment comment={reviewAttachments} />}
      <Title order={3} mb="md">
        {t('details.attachment.title')}
      </Title>
      <Paper shadow="0" p="lg" radius="lg" withBorder mt="xl">
        {attachment}
      </Paper>
    </>
  );
}

export default DetailsAttachment;
