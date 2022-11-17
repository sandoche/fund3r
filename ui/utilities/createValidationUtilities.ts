import type { FocusEvent, FormEvent } from 'react';
import type { UseFormReturnType } from '@mantine/form/lib/use-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createValidationUtilities = (form: UseFormReturnType<any>) => {
  const validateFieldOnBlur = (e: FocusEvent) => {
    form.validateField(e.target.id);
  };

  const validateFieldOnInput = (e: FormEvent) => {
    const element = e.target as HTMLInputElement;
    const { id } = element;

    if (form.errors[id]) {
      form.validateField(id);
    }
  };

  return {
    validateFieldOnBlur,
    validateFieldOnInput,
  };
};

export default createValidationUtilities;
