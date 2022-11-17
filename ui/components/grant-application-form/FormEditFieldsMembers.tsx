import { Title } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import AutoFormFields from '@/components/auto-form/AutoFormFields';
import FormEditFieldsTeamMembers from '@/components/grant-application-form/FormEditFieldsTeamMembers';
import { WorkingTypes } from '@/types/GrantApplicationInterface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsMembers({ form, schema, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; loading: boolean }) {
  const { t } = useTranslation('grant');

  const fields = ['firstname', 'lastname', 'dateOfBirth', 'email', 'github', 'twitter', 'workingAloneOrTeam'];

  return (
    <>
      <Title order={2} mt={48} mb={24}>
        {t('form.memmberDetailsTitle')}
      </Title>
      <AutoFormFields form={form} schema={schema} fields={fields} loading={loading} translationNamespace="grant" />
      {form.values.workingAloneOrTeam === WorkingTypes.WorkingWithTeam && (
        <>
          <AutoFormFields form={form} schema={schema} fields={['aboutTeam']} loading={loading} translationNamespace="grant" />
          <FormEditFieldsTeamMembers form={form} loading={loading} />
        </>
      )}
      <AutoFormFields form={form} schema={schema} fields={['hasPreviouslyReceivedFundingTokensGrantsFromNear']} loading={loading} translationNamespace="grant" />
      {form.values.hasPreviouslyReceivedFundingTokensGrantsFromNear && (
        <AutoFormFields form={form} schema={schema} fields={['aboutTokensReceivedFromNear']} loading={loading} translationNamespace="grant" />
      )}
    </>
  );
}

export default FormEditFieldsMembers;
