import { Alert, Text } from '@mantine/core';
import { Message } from 'tabler-icons-react';

function FeedbackComment({ comment }: { comment: string | null }) {
  return (
    <Alert icon={<Message size={32} />} color="violet" mb="xl">
      <Text color="violet">{comment}</Text>
    </Alert>
  );
}

export default FeedbackComment;
