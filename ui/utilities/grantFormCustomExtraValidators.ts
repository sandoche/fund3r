import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import type { TFunction } from 'next-i18next';

import { VIDEO_REQUIRED_USD_GRANT_TRESHOLD } from '@/config/grants';
import { WorkingTypes } from '@/types/GrantApplicationInterface';
import budgetCalculator from '@/utilities/budgetCalculator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = (form: UseFormReturnType<any>, t: TFunction) => {
  const validation = form.validate();
  const totalBudget = budgetCalculator(form.values.fundingAmount, form.values.milestones);

  let hasCustomErrors = false;
  let customErrors = {};

  if (form.values.hasPreviouslyReceivedFundingTokensGrantsFromNear && form.values.aboutTokensReceivedFromNear.length === 0) {
    customErrors = {
      ...customErrors,
      aboutTokensReceivedFromNear: t('form.aboutTokensReceivedFromNear.error'),
    };

    hasCustomErrors = true;
  }

  if (form.values.workingAloneOrTeam === WorkingTypes.WorkingWithTeam && form.values.aboutTeam.trim() === '') {
    customErrors = {
      ...customErrors,
      aboutTeam: t('form.aboutTeam.error'),
    };

    hasCustomErrors = true;
  }

  if (totalBudget >= VIDEO_REQUIRED_USD_GRANT_TRESHOLD && form.values.attachment.trim() === '') {
    customErrors = {
      ...customErrors,
      attachment: t('form.attachment.error'),
    };

    hasCustomErrors = true;
  }

  form.setErrors({
    ...validation.errors,
    ...customErrors,
  });

  return validation.hasErrors || hasCustomErrors;
};

export default validate;
