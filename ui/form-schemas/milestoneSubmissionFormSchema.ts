import { TFunction } from 'next-i18next';
import { z } from 'zod';

const createSchema = (t: TFunction) => {
  return z.object({
    githubUrl: z.string({ required_error: t('form.githubUrl.error') }).url({ message: t('form.githubUrl.error') }),
    attachment: z
      .string({ required_error: t('form.attachment.error') })
      .url({ message: t('form.attachment.error') })
      .optional(),
    comments: z.string().optional(),
  });
};

export default createSchema;
