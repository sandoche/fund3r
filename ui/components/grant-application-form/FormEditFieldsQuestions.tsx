import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import { z } from 'zod';

import AutoFormFields from '@/components/auto-form/AutoFormFields';
import { VIDEO_REQUIRED_USD_GRANT_TRESHOLD } from '@/config/grants';
import budgetCalculator from '@/utilities/budgetCalculator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsQuestions({ form, schema, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; loading: boolean }) {
  const totalBudget = budgetCalculator(form.values.fundingAmount, form.values.milestones);

  const fields = [
    'whatAndWhy',
    'competitionDifference',
    'openSourceState',
    'opensourceComponentUse',
    'impactOnEcosystem',
    'excitementNear',
    'successMesurement',
    'projectRaisingRound',
  ];

  return (
    <>
      <AutoFormFields form={form} schema={schema} fields={fields} loading={loading} translationNamespace="grant" />
      {totalBudget >= VIDEO_REQUIRED_USD_GRANT_TRESHOLD && <AutoFormFields form={form} schema={schema} fields={['attachment']} loading={loading} translationNamespace="grant" />}
    </>
  );
}

export default FormEditFieldsQuestions;
