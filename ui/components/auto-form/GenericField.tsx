import { useMemo } from 'react';
import { Checkbox, NumberInput, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GenericField(props: any) {
  const { t } = useTranslation('grant');

  const { zodTypeDef, ...otherProps } = props;
  const typeName = zodTypeDef.innerType || zodTypeDef.typeName;
  const required = zodTypeDef.typeName !== 'ZodOptional';
  const description = zodTypeDef.description || null;

  // const maxArray = zodTypeDef.checks?.filter((check: any) => {
  //   return check.kind === 'max';
  // });

  const email = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      zodTypeDef.checks?.filter((check: any) => {
        return check.kind === 'email';
      }),
    [zodTypeDef],
  );

  const type = useMemo(() => (email?.length > 0 ? 'email' : 'text'), [email]);

  const sharedProps = {
    required,
    type,
    description,
  };

  switch (typeName) {
    case 'ZodString':
      return <TextInput {...otherProps} {...sharedProps} />;

    case 'ZodNumber':
      return <NumberInput {...otherProps} {...sharedProps} />;

    case 'ZodNativeEnum':
      // eslint-disable-next-line no-case-declarations
      const data = Object.keys(zodTypeDef.values).map((key) => ({
        label: t(`form.labels.${zodTypeDef.values[key]}`),
        value: zodTypeDef.values[key],
      }));

      return <Select {...otherProps} {...sharedProps} data={data} />;

    case 'ZodDate':
      return <DatePicker {...otherProps} {...sharedProps} />;

    case 'ZodBoolean':
      return <Checkbox {...otherProps} {...sharedProps} color="violet" type="checkbox" checked={otherProps.value} required={false} />;

    default:
      return <TextInput {...otherProps} {...sharedProps} />;
  }
}

export default GenericField;
