import Countries from '@kycdao/kycdao-sdk/dist/countries.list.json';
import { Select, Title } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';
import { useTranslation } from 'next-i18next';
import { z } from 'zod';

import AutoFormFields from '@/components/auto-form/AutoFormFields';
import createValidationUtilities from '@/utilities/createValidationUtilities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsAddress({ form, schema, loading }: { form: UseFormReturnType<any>; schema: z.ZodObject<any>; loading: boolean }) {
  const { t } = useTranslation('grant');

  const fields = ['addressCity', 'addressStreet', 'addressZip'];

  const { validateFieldOnBlur, validateFieldOnInput } = createValidationUtilities(form);

  const data = Countries.map((country) => ({
    label: country.name,
    value: country.iso_cca2,
  }));

  return (
    <>
      <Title order={2} mt={48} mb={24}>
        {t('form.addressDetailsTitle')}
      </Title>
      <Select
        key="addressCountry"
        id="addressCountry"
        label={t(`form.addressCountry.label`)}
        placeholder={t(`form.addressCountry.placeholder`)}
        mt="md"
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        disabled={loading}
        variant="filled"
        {...form.getInputProps('addressCountry')}
        searchable
        nothingFound={t(`form.addressCountry.no-results`)}
        data={data}
        error={form.getInputProps('addressCountry').error && t(`form.addressCountry.error`)}
      />
      <AutoFormFields form={form} schema={schema} fields={fields} loading={loading} translationNamespace="grant" />
    </>
  );
}

export default FormEditFieldsAddress;
