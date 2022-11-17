import { ActionIcon, Button, Group, NumberInput, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useTranslation } from 'next-i18next';
import { Trash } from 'tabler-icons-react';

import createValidationUtilities from '@/utilities/createValidationUtilities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsMilestones({ form, loading }: { form: any; loading: boolean }) {
  const { t } = useTranslation('grant');
  const { validateFieldOnBlur, validateFieldOnInput } = createValidationUtilities(form);

  const milestonesFields = form.values.milestones.map((item: unknown, index: number) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}>
      <Group mt="md">
        <Title order={3}>
          {t('form.milestoneTitle')} {index + 1}
        </Title>
        <ActionIcon color="red" variant="hover" onClick={() => form.removeListItem('milestones', index)}>
          <Trash size={16} />
        </ActionIcon>
      </Group>
      <NumberInput
        id={`milestones.${index}.budget`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'budget')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        label={t('form.budget.label')}
        placeholder={t('form.budget.placeholder')}
        variant="filled"
        mt="md"
      />
      <DatePicker
        id={`milestones.${index}.deliveryDate`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'deliveryDate')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        label={t('form.deliveryDate.label')}
        placeholder={t('form.deliveryDate.placeholder')}
        variant="filled"
        mt="md"
      />
      <TextInput
        id={`milestones.${index}.description`}
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('milestones', index, 'description')}
        onBlur={validateFieldOnBlur}
        onInput={validateFieldOnInput}
        label={t('form.milestoneDescription.label')}
        placeholder={t('form.milestoneDescription.placeholder')}
        variant="filled"
        mt="md"
        mb="xl"
      />
    </div>
  ));

  const addMilestone = () => {
    form.addListItem('milestones', { budget: 0, deliveryDate: new Date(), description: '' });
  };

  return (
    <>
      {milestonesFields}
      <Button color="violet" disabled={loading} onClick={addMilestone} variant="light">
        {t('form.addMilestone')}
      </Button>
    </>
  );
}

export default FormEditFieldsMilestones;
