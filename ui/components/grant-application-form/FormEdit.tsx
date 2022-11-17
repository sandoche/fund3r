/* eslint-disable max-lines-per-function */
import type { MouseEvent, SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Alert, Button, Divider, Grid, Group, MediaQuery, Text, Title } from '@mantine/core';
import { formList, useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import * as dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import { AlertCircle } from 'tabler-icons-react';

import FormEditFieldsAddress from '@/components/grant-application-form/FormEditFieldsAddress';
import FormEditFieldsMembers from '@/components/grant-application-form/FormEditFieldsMembers';
import FormEditFieldsMilestones from '@/components/grant-application-form/FormEditFieldsMilestones';
import FormEditFieldsNear from '@/components/grant-application-form/FormEditFieldsNear';
import FormEditFieldsProject from '@/components/grant-application-form/FormEditFieldsProject';
import FormEditFieldsQuestions from '@/components/grant-application-form/FormEditFieldsQuestions';
import FormSummary from '@/components/grant-application-form/FormSummary';
import createSchema from '@/form-schemas/grantApplicationFormSchema';
import useAccountSignature from '@/hooks/useAccountSignature';
import useSigner from '@/modules/near-api-react/hooks/useSigner';
import useWallet from '@/modules/near-api-react/hooks/useWallet';
import { saveGrantApplicationAsDraft, submitGrantApplication } from '@/services/apiService';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';
import validate from '@/utilities/grantFormCustomExtraValidators';
import parseMilestonesDates from '@/utilities/parseMilestonesDates';

function FormEdit({ data, setData }: { data: GrantApplicationInterface | undefined | null; setData: (data: GrantApplicationInterface) => void }) {
  const { t } = useTranslation('grant');

  const apiSignature = useAccountSignature();
  const { signObjectMessage } = useSigner();
  const wallet = useWallet();

  const accountId = wallet && wallet.isSignedIn() && wallet.getAccountId();

  const schema = createSchema(t);

  // The following is required to avoid warnings
  const defaultData = {
    projectName: '',
    projectUrl: '',
    githubUrl: '',
    projectDescription: '',
    whatAndWhy: '',
    competitionDifference: '',
    opensourceComponentUse: '',
    impactOnEcosystem: '',
    excitementNear: '',
    successMesurement: '',
    firstname: '',
    lastname: '',
    email: '',
    github: '',
    twitter: '',
    hasPreviouslyReceivedFundingTokensGrantsFromNear: false,
    addressCountry: '',
    addressCity: '',
    addressStreet: '',
    addressZip: '',
    howHeardGrants: '',
    referral: '',
    comments: '',
    aboutTokensReceivedFromNear: '',
    attachment: '',
    aboutTeam: '',
  };

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      ...defaultData,
      ...data,
      milestones: formList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }>([]),
      teamMembers: formList<{ githubUrl?: string }>([]),
    },
  });

  const grantId = data?.id;
  const grantData = { ...form.values, id: grantId, nearId: accountId };

  const {
    refetch: saveForm,
    isLoading: isSavingLoading,
    isError: isSavingError,
  } = useQuery(
    ['saveForm', apiSignature, grantId, grantData, signObjectMessage],
    () =>
      saveGrantApplicationAsDraft(apiSignature, {
        grantId,
        grantData,
        signObjectMessage,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (responseData) => {
        setData({
          ...grantData,
          ...responseData,
          projectLaunchDate: responseData?.projectLaunchDate ? new Date(responseData.projectLaunchDate) : undefined,
          dateOfBirth: responseData?.dateOfBirth ? new Date(responseData.dateOfBirth) : undefined,
          milestones: formList(responseData?.milestones ? parseMilestonesDates(responseData.milestones) : []),
          teamMembers: formList(responseData?.teamMembers || []),
        });
      },
    },
  );

  const {
    refetch: submitForm,
    isLoading: isSubmitingLoading,
    isError: isSubmitingError,
  } = useQuery(
    ['submitForm', apiSignature, grantId, grantData, signObjectMessage],
    () =>
      submitGrantApplication(apiSignature, {
        grantId,
        grantData,
        signObjectMessage,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      onSuccess: async (responseData) => {
        if (responseData) {
          setData(responseData);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        form.setErrors(error?.response?.data?.errors);

        showNotification({
          color: 'red',
          message: t('error.form.message'),
        });
      },
    },
  );

  useEffect(() => {
    if (data) {
      const mergedValues = {
        ...form.values,
        ...data,
        projectLaunchDate: data?.projectLaunchDate ? new Date(data.projectLaunchDate) : undefined,
        dateOfBirth: data?.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        milestones: formList<{ budget?: number | null; deliveryDate?: Date | null; description?: string | null }>(data?.milestones ? parseMilestonesDates(data.milestones) : []),
        teamMembers: formList<{ githubUrl?: string }>(data?.teamMembers || []),
      };

      form.setValues(mergedValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const saveDraft = () => {
    saveForm();
  };

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const hasErrors = validate(form, t);

    if (hasErrors) {
      showNotification({
        color: 'red',
        message: t('error.form.message'),
      });

      return;
    }

    submitForm();
  };

  const saveDraftHandler = (e: MouseEvent) => {
    e.preventDefault();
    saveDraft();
  };

  const loading = isSavingLoading || isSubmitingLoading;
  const lastSavedDate = data?.dateLastDraftSaving;
  const error = isSavingError || isSubmitingError;

  return (
    <Grid
      gutter={48}
      mb="xl"
      sx={() => ({
        '@media (max-width: 1200px)': {
          margin: -16,
        },
      })}
    >
      <Grid.Col xs={12} sm={8}>
        <div>
          <Title order={1} mb={24}>
            {t('form.title')}
          </Title>
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: t('form.description') }} />
        </div>
        {error && (
          <Alert icon={<AlertCircle size={16} />} title={t('error.generic.title')} color="orange" mt={16}>
            {t('error.generic.description')}
          </Alert>
        )}
        <form onSubmit={submit}>
          <div>
            <FormEditFieldsProject form={form} schema={schema} loading={loading} />
            <Divider mt={32} mb={32} />
            <FormEditFieldsMilestones form={form} loading={loading} />
            <Divider mt={32} mb={32} />
            <FormEditFieldsQuestions form={form} schema={schema} loading={loading} />
            <FormEditFieldsMembers form={form} schema={schema} loading={loading} />
            <FormEditFieldsAddress form={form} schema={schema} loading={loading} />
            <Divider mt={32} mb={32} />
            <FormEditFieldsNear form={form} schema={schema} loading={loading} />
            <Divider mt={32} mb={32} />
          </div>
          <Group mt="xl" position="apart">
            <Group position="left" mt="xl">
              <Text size="sm" color="dimmed">
                {lastSavedDate && t('form.draft_date') + dayjs.default(lastSavedDate).format('ddd, MMM D, YYYY - HH:mm')}
              </Text>
            </Group>
            <Group position="right" mt="xl">
              <Button color="violet" onClick={saveDraftHandler} variant="light" loading={isSavingLoading}>
                {t('form.save')}
              </Button>
              <Button type="submit" color="violet" disabled={loading} loading={isSubmitingLoading}>
                {t('form.submit')}
              </Button>
            </Group>
          </Group>
        </form>
      </Grid.Col>
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Grid.Col sm={4}>
          <FormSummary data={form.values} />
        </Grid.Col>
      </MediaQuery>
    </Grid>
  );
}

export default FormEdit;
