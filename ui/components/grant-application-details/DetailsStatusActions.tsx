import { Alert, Button, Paper, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import * as dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import StatusActionEvaluated from '@/components/grant-application-details/StatusActionEvaluated';
import StatusActionKycApproved from '@/components/grant-application-details/StatusActionKycApproved';
import StatusActionProjectApproved from '@/components/grant-application-details/StatusActionProjectApproved';
import StatusActionProposalSubmission from '@/components/grant-application-details/StatusActionProposalSubmission';
import StatusActionsMilestones from '@/components/grant-application-details/StatusActionsMilestones';
import { DEMO_MODE, SKIP_EVALUATION_APPROVAL } from '@/config/grants';
import { STATUS, useGrantStatus } from '@/hooks/useGrantStatus';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

// eslint-disable-next-line max-lines-per-function
function DetailsStatusActions({
  grant,
  setGrant,
  refetchGrant,
}: {
  grant: GrantApplicationInterface | null | undefined;
  setGrant: (data: GrantApplicationInterface) => void;
  refetchGrant: unknown;
}) {
  const { t } = useTranslation('grant');
  const { status } = useGrantStatus();

  if (!grant) {
    return null;
  }

  const { id, email, firstname, lastname, dateInterview, helloSignRequestUrl, addressCountry, dateAgreementSignatureGrantReceiver } = grant;

  const {
    SUBMITTED,
    EVALUATED,
    INTERVIEW_SCHEDULED,
    INTERVIEW_COMPLETED,
    DENIED,
    APPROVED,
    KYC_COMPLETED,
    KYC_DENIED,
    KYC_APPROVED,
    AGREEMENT_PARTIALLY_SIGNED,
    AGREEMENT_FULLY_SIGNED,
    ONCHAIN_SUBMITTED,
    FIRST_PAYMENT_SENT,
    ONBOARDING_COMPLETED,
  } = STATUS;

  if (status === ONBOARDING_COMPLETED) {
    return <StatusActionsMilestones grant={grant} setGrant={setGrant} />;
  }

  if (status === FIRST_PAYMENT_SENT) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.first-payment-sent.message')}</Text>
      </Paper>
    );
  }

  if (status === ONCHAIN_SUBMITTED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.submitted-onchain.message')}</Text>
      </Paper>
    );
  }

  if (status === AGREEMENT_FULLY_SIGNED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.agreement-signed.message')}</Text>
        </Paper>
        <StatusActionProposalSubmission data={grant} setData={setGrant} />
      </>
    );
  }

  if (status === AGREEMENT_PARTIALLY_SIGNED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.agreement-partially-signed.message')}</Text>
        {DEMO_MODE && (
          <Alert icon={<IconAlertCircle size={16} />} title={t('details.status-actions.agreement-partially-signed.demo.title')} color="cyan" mt="lg">
            {t('details.status-actions.agreement-partially-signed.demo.description')}
          </Alert>
        )}
      </Paper>
    );
  }

  if (status === KYC_APPROVED) {
    return (
      <StatusActionKycApproved helloSignRequestUrl={helloSignRequestUrl} refetchGrant={refetchGrant} dateAgreementSignatureGrantReceiver={dateAgreementSignatureGrantReceiver} />
    );
  }

  if (status === KYC_DENIED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.kyc-denied.message')}</Text>
        <Button color="violet">{t('details.status-actions.kyc-denied.button')}</Button>
      </Paper>
    );
  }

  if (status === KYC_COMPLETED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text mb="sm">{t('details.status-actions.kyc-completed.title')}</Text>
        <Text>{t('details.status-actions.kyc-completed.description')}</Text>
      </Paper>
    );
  }

  if (status === APPROVED) {
    return <StatusActionProjectApproved email={email} country={addressCountry} />;
  }

  if (status === DENIED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.denied.message')}</Text>
      </Paper>
    );
  }

  if (status === INTERVIEW_COMPLETED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.interview-completed.title')}</Text>
        </Paper>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.interview-completed.message')}</Text>
        </Paper>
      </>
    );
  }

  if (status === INTERVIEW_SCHEDULED) {
    return (
      <Paper shadow="sm" p="lg" radius="lg" mt="xl">
        <Text>{t('details.status-actions.interview-scheduled.title')}</Text>
        <Text>{dayjs.default(dateInterview).format('ddd, MMM D, YYYY - HH:mm')}</Text>
        {DEMO_MODE && (
          <Alert icon={<IconAlertCircle size={16} />} title={t('details.status-actions.interview-scheduled.demo.title')} color="cyan" mt="lg">
            {t('details.status-actions.interview-scheduled.demo.description')}
          </Alert>
        )}
      </Paper>
    );
  }

  if (status === EVALUATED) {
    return (
      <>
        {SKIP_EVALUATION_APPROVAL && (
          <Paper shadow="sm" p="lg" radius="lg" mt="xl">
            <Text>{t('details.status-actions.submitted.message')}</Text>
          </Paper>
        )}
        <StatusActionEvaluated id={id} email={email} firstname={firstname} lastname={lastname} setGrant={setGrant} />
      </>
    );
  }

  if (status === SUBMITTED) {
    return (
      <>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.submitted.message')}</Text>
        </Paper>
        <Paper shadow="sm" p="lg" radius="lg" mt="xl">
          <Text>{t('details.status-actions.submitted.description')}</Text>
        </Paper>
      </>
    );
  }
  return null;
}

export default DetailsStatusActions;
