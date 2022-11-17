import type { SyntheticEvent } from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Alert, Button, Group, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { AlertCircle } from 'tabler-icons-react';

import AutoFormFields from '@/components/auto-form/AutoFormFields';
import LoadingAnimation from '@/components/common/LoadingAnimation';
import createSchema from '@/form-schemas/fullMilestoneSubmissionFormSchema';
import useAccountSignature from '@/hooks/useAccountSignature';
import useDaoContract from '@/hooks/useDaoContract';
import useSigner from '@/modules/near-api-react/hooks/useSigner';
import { submitFullMilestoneData, validateMilestoneNearTransactionHash } from '@/services/apiService';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

// eslint-disable-next-line max-lines-per-function
function CreateFullMilestoneForm({ grantData, milestoneId }: { grantData: GrantApplicationInterface | null; milestoneId: number }) {
  const { t } = useTranslation('milestone');
  const router = useRouter();
  const apiSignature = useAccountSignature();
  const { signObjectMessage } = useSigner();
  const { isNearLoading, submitProposal } = useDaoContract();

  const { grantRequestSlug, errorCode, transactionHashes } = router.query;

  const schema = createSchema(t);

  // The following is required to avoid warnings
  const defaultData = {
    budget: 0,
    deliveryDate: new Date(),
    description: '',
    attachment: '',
    githubUrl: '',
    comments: '',
  };

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      ...defaultData,
    },
  });

  const milestoneNumber = milestoneId + 1;
  const grantId = grantData?.id;

  const { isLoading, refetch: fetchValidateTransactionHash } = useQuery(
    ['validate-transaction-hash', apiSignature, grantId, milestoneId, transactionHashes],
    () => {
      return validateMilestoneNearTransactionHash(apiSignature, { grantId, milestoneId: milestoneId - 1, proposalNearTransactionHash: transactionHashes });
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: () => {
        router.push(`/grants/${grantRequestSlug}`);
      },
    },
  );

  useEffect(() => {
    if (transactionHashes && apiSignature && typeof grantId !== 'undefined' && grantId >= 0 && milestoneId >= 0) {
      fetchValidateTransactionHash();
    }
    if (errorCode) {
      router.push(`/grants/${grantRequestSlug}`);
    }
  }, [transactionHashes, fetchValidateTransactionHash, apiSignature, grantId, milestoneId, errorCode, router, grantRequestSlug]);

  const {
    refetch: submitForm,
    isLoading: isSubmitingLoading,
    isError: isSubmitingError,
  } = useQuery(
    ['submitFullMilestoneData', apiSignature, grantId, milestoneId, form.values, signObjectMessage],
    () =>
      submitFullMilestoneData(apiSignature, {
        grantId,
        milestoneId,
        milestoneData: form.values,
        signObjectMessage,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      retry: false,
      onSuccess: async (data) => {
        if (!data) {
          throw new Error('Grant data is not available');
        }
        const lastIndex = data.milestones.length - 1;

        submitProposal(data, data?.milestones[lastIndex]?.budget, milestoneNumber, data?.milestones[lastIndex]?.hashProposal);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        form.setErrors(error?.response?.data?.errors);
      },
    },
  );

  const loading = isSubmitingLoading || isNearLoading;
  const error = isSubmitingError;

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    submitForm();
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <Title>{t('form.title', { number: milestoneNumber })}</Title>
      {error && (
        <Alert icon={<AlertCircle size={16} />} title={t('error.generic.title')} color="orange" mt={16}>
          {t('error.generic.description')}
        </Alert>
      )}
      <form onSubmit={submit}>
        <AutoFormFields
          form={form}
          schema={schema}
          fields={['budget', 'deliveryDate', 'description', 'githubUrl', 'attachment', 'comments']}
          loading={loading}
          translationNamespace="milestone"
        />
        <Group position="right" mt="xl">
          <Button type="submit" color="violet" disabled={loading} loading={isSubmitingLoading || isNearLoading}>
            {t('form.submit')}
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default CreateFullMilestoneForm;
