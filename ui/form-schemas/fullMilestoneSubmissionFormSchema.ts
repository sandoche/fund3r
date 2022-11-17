import { TFunction } from 'next-i18next';
import { z } from 'zod';

const createSchema = (t: TFunction) => {
  return z.object({
    budget: z.number({ invalid_type_error: t('form.budget.error'), required_error: t('form.budget.error') }).min(1, { message: t('form.budget.error') }),
    deliveryDate: z.date({ invalid_type_error: t('form.deliveryDate.error'), required_error: t('form.deliveryDate.error') }),
    description: z
      .string({ required_error: t('form.description.error') })
      .min(1, { message: t('form.description.error') })
      .max(100, { message: t('form.description.error') }),
    githubUrl: z.string({ required_error: t('form.githubUrl.error') }).url({ message: t('form.githubUrl.error') }),
    attachment: z
      .string({ required_error: t('form.attachment.error') })
      .url({ message: t('form.attachment.error') })
      .optional(),
    comments: z.string().optional(),
  });
};

export default createSchema;
