import { ActionIcon, Button, Group, TextInput } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { Trash } from 'tabler-icons-react';

import createValidationUtilities from '@/utilities/createValidationUtilities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FormEditFieldsTeamMembers({ form, loading }: { form: any; loading: boolean }) {
  const { t } = useTranslation('grant');
  const { validateFieldOnBlur, validateFieldOnInput } = createValidationUtilities(form);

  const teamMemberFields = form.values.teamMembers.map((item: unknown, index: number) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}>
      <Group mt="md">
        <TextInput
          id={`teamMember.${index}.githubUrl`}
          required
          sx={{ flex: 1 }}
          {...form.getListInputProps('teamMembers', index, 'githubUrl')}
          onBlur={validateFieldOnBlur}
          onInput={validateFieldOnInput}
          label={t('form.membersGithubUrl.label')}
          placeholder={t('form.membersGithubUrl.placeholder')}
          variant="filled"
        />
        <ActionIcon color="red" variant="hover" onClick={() => form.removeListItem('teamMembers', index)}>
          <Trash size={16} />
        </ActionIcon>
      </Group>
    </div>
  ));

  const addTeamMember = () => {
    form.addListItem('teamMembers', { githubUrl: '' });
  };

  return (
    <>
      {teamMemberFields}
      <Button mt="lg" mb="lg" color="violet" disabled={loading} onClick={addTeamMember} variant="light">
        {t('form.addTeamMember')}
      </Button>
    </>
  );
}

export default FormEditFieldsTeamMembers;
