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
import CreateFullMilestoneForm from '@/components/milestone-submission/CreateFullMilestoneForm';
import { ALLOW_MILESTONES_ON_THE_GO } from '@/config/grants';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import useGrant from '@/hooks/useGrant';
import DefaultLayout from '@/layouts/default';
import { getGrantApplication } from '@/services/apiService';
import parseCookies from '@/utilities/parseCookies';

function SubmitMilestone() {
  const router = useRouter();
  const { t } = useTranslation('milestone');
  const { grantRequestSlug } = router.query;

  if (typeof grantRequestSlug !== 'string' || !ALLOW_MILESTONES_ON_THE_GO) {
    throw new Error('Invalid URL');
  }

  const grantRequestSlugSplit = grantRequestSlug.split('-');
  const id = grantRequestSlugSplit[grantRequestSlugSplit.length - 1];
  const grantId = parseInt(id as string, 10);

  const { grant, isLoading } = useGrant(grantId);

  const milestoneIdInteger = grant?.milestones.length || 0;

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
                <CreateFullMilestoneForm grantData={grant} milestoneId={milestoneIdInteger} />
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
