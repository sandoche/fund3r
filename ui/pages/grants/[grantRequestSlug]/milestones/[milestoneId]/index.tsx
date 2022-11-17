import { ErrorBoundary } from 'react-error-boundary';
import { dehydrate, QueryClient } from 'react-query';
import { Container } from '@mantine/core';
import type { NextApiRequest } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ParsedUrlQuery } from 'querystring';

import LoadingAnimation from '@/components/common/LoadingAnimation';
import NearAuthenticationGuardWithLoginRedirection from '@/components/common/NearAuthenticationGuardWithLoginRedirection';
import Error500 from '@/components/errors/500';
import MilestoneError from '@/components/milestone-submission/MilestoneError';
import MilestoneForm from '@/components/milestone-submission/MilestoneForm';
import MilestoneProposalSubmission from '@/components/milestone-submission/MilestoneProposalSubmission';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import useGrant from '@/hooks/useGrant';
import { MILESTONE_STATUS, useMilestonesStatus } from '@/hooks/useMilestonesStatus';
import DefaultLayout from '@/layouts/default';
import { getGrantApplication } from '@/services/apiService';
import parseCookies from '@/utilities/parseCookies';

function SubmitMilestone() {
  const router = useRouter();
  const { t } = useTranslation('milestone');
  const { grantRequestSlug, milestoneId } = router.query;
  const { milestonesStatus } = useMilestonesStatus();

  if (typeof grantRequestSlug !== 'string' || typeof milestoneId !== 'string') {
    throw new Error('Invalid URL');
  }

  const grantRequestSlugSplit = grantRequestSlug.split('-');
  const id = grantRequestSlugSplit[grantRequestSlugSplit.length - 1];
  const grantId = parseInt(id as string, 10);

  const { grant, isLoading } = useGrant(grantId);

  const milestoneIdInteger = parseInt(milestoneId as string, 10);
  const status = milestonesStatus && milestonesStatus[milestoneIdInteger] && milestonesStatus[milestoneIdInteger].status;

  const previousMilestoneId = milestoneIdInteger - 1;
  const previousStatus = milestonesStatus && milestonesStatus[previousMilestoneId] && milestonesStatus[previousMilestoneId].status;

  const previousMilestoneNotSubmitted = milestoneIdInteger > 0 && (previousStatus === MILESTONE_STATUS.STARTED || previousStatus === MILESTONE_STATUS.PARTLY_SUBMITTED);

  return (
    <DefaultLayout>
      <>
        <Head>
          <title>{t('title')}</title>
        </Head>
        <NearAuthenticationGuardWithLoginRedirection>
          <ErrorBoundary FallbackComponent={Error500}>
            {isLoading ? (
              <LoadingAnimation />
            ) : (
              <Container size="lg">
                {!previousMilestoneNotSubmitted && status === MILESTONE_STATUS.STARTED && <MilestoneForm grantData={grant} milestoneId={milestoneIdInteger} />}
                {!previousMilestoneNotSubmitted && status === MILESTONE_STATUS.PARTLY_SUBMITTED && (
                  <MilestoneProposalSubmission grantData={grant} milestoneId={milestoneIdInteger} />
                )}
                {(previousMilestoneNotSubmitted || (status !== MILESTONE_STATUS.PARTLY_SUBMITTED && status !== MILESTONE_STATUS.STARTED)) && (
                  <MilestoneError milestoneId={milestoneIdInteger} previousMilestoneNotSubmitted={previousMilestoneNotSubmitted} />
                )}
              </Container>
            )}
          </ErrorBoundary>
        </NearAuthenticationGuardWithLoginRedirection>
      </>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, locale, params }: { req: NextApiRequest; locale: string; params: ParsedUrlQuery }) {
  const queryClient = new QueryClient();
  const data = parseCookies(req);
  const apiSignature = data[COOKIE_SIGNATURE_KEY] ? JSON.parse(data[COOKIE_SIGNATURE_KEY]) : null;

  const { grantRequestSlug } = params;

  if (typeof grantRequestSlug !== 'string') {
    return {
      notFound: true,
    };
  }

  const grantRequestSlugSplit = grantRequestSlug.split('-');
  const id = grantRequestSlugSplit[grantRequestSlugSplit.length - 1];

  await queryClient.prefetchQuery(['grant', apiSignature], () => getGrantApplication(apiSignature, id));
  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['milestone'])),
      dehydratedState,
    },
  };
}

export default SubmitMilestone;
