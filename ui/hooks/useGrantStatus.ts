import { useContext } from 'react';

import GrantContext from '@/contexts/GrantContext';

const STATUS = {
  EDIT: 'EDIT',
  SUBMITTED: 'SUBMITTED',
  EVALUATED: 'EVALUATED',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  INTERVIEW_COMPLETED: 'INTERVIEW_COMPLETED',
  DENIED: 'DENIED',
  APPROVED: 'APPROVED',
  KYC_COMPLETED: 'KYC_COMPLETED',
  KYC_APPROVED: 'KYC_APPROVED',
  KYC_DENIED: 'KYC_DENIED',
  AGREEMENT_PARTIALLY_SIGNED: 'AGREEMENT_PARTIALLY_SIGNED',
  AGREEMENT_FULLY_SIGNED: 'AGREEMENT_FULLY_SIGNED',
  ONCHAIN_SUBMITTED: 'ONCHAIN_SUBMITTED',
  FIRST_PAYMENT_SENT: 'FIRST_PAYMENT_SENT',
  ONBOARDING_COMPLETED: 'ONBOARDING_COMPLETED',
};

const useGrantStatus = () => {
  const context = useContext(GrantContext);

  if (context === undefined) {
    throw new Error(`useGrantStatus must be used within a GrantProvider`);
  }

  const { grant } = context;

  const grantSubmitted = grant && grant.dateSubmission;
  const grantEvaluated = grantSubmitted && grant.dateEvaluation;
  const grantInterviewScheduled = grantEvaluated && grant.dateInterviewScheduled;
  const grantInterviewCompleted = grantInterviewScheduled && grant.dateInterviewCompletionConfirmation;
  const grantDenied = grantSubmitted && grant.dateDenial;
  const grantApproved = grantSubmitted && grant.dateApproval;
  const grantKycCompleted = grantApproved && grant.dateKycCompletion;
  const grantKycApproved = grantKycCompleted && grant.dateKycApproved;
  const grantKycDenied = grantKycCompleted && grant.dateKycDenied;
  const grantAgreementPartiallySigned = grantKycApproved && grant.dateAgreementSignatureGrantReceiver;
  const grantAgreementFullySigned = grantAgreementPartiallySigned && grant.dateAgreementSignatureGrantGiver;
  const grantAgreementSubmitedOnChain = grantAgreementFullySigned && grant && grant.isNearProposalValid;
  const grantFirstPaymentSent = grantAgreementSubmitedOnChain && grant.dateFirstPaymentSent;
  const grantOnboardingCompleted = grantFirstPaymentSent && grant?.dateOnboardingCompletion;

  if (grantOnboardingCompleted) {
    return { status: STATUS.ONBOARDING_COMPLETED, step: 7 };
  }

  if (grantFirstPaymentSent) {
    return { status: STATUS.FIRST_PAYMENT_SENT, step: 6, pendingStep: 7 };
  }

  if (grantAgreementSubmitedOnChain) {
    return { status: STATUS.ONCHAIN_SUBMITTED, step: 5, pendingStep: 6 };
  }

  if (grantAgreementFullySigned) {
    return { status: STATUS.AGREEMENT_FULLY_SIGNED, step: 4, pendingStep: 5 };
  }

  if (grantAgreementPartiallySigned) {
    return { status: STATUS.AGREEMENT_PARTIALLY_SIGNED, step: 3, pendingStep: 4 };
  }

  if (grantKycApproved) {
    return { status: STATUS.KYC_APPROVED, step: 3 };
  }

  if (grantKycDenied) {
    return { status: STATUS.KYC_DENIED, step: 2 };
  }

  if (grantKycCompleted) {
    return { status: STATUS.KYC_COMPLETED, step: 2, pendingStep: 3 };
  }

  if (grantApproved) {
    return { status: STATUS.APPROVED, step: 2 };
  }

  if (grantDenied) {
    return { status: STATUS.DENIED, step: 1, pendingStep: 2 };
  }

  if (grantInterviewCompleted) {
    return { status: STATUS.INTERVIEW_COMPLETED, step: 1, pendingStep: 2 };
  }

  if (grantInterviewScheduled) {
    return { status: STATUS.INTERVIEW_SCHEDULED, step: 1 };
  }

  if (grantEvaluated) {
    return { status: STATUS.EVALUATED, step: 1 };
  }

  if (grantSubmitted) {
    return { status: STATUS.SUBMITTED, step: 0 };
  }

  return { status: STATUS.EDIT, step: 0 };
};

export { STATUS, useGrantStatus };
