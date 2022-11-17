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
import Error401 from '@/components/errors/401';
import Error500 from '@/components/errors/500';
import GrantApplicationDetails from '@/components/grant-application-details/GrantApplicationDetails';
import GrantApplicationForm from '@/components/grant-application-form/GrantApplicationForm';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import useGrant from '@/hooks/useGrant';
import { STATUS, useGrantStatus } from '@/hooks/useGrantStatus';
import DefaultLayout from '@/layouts/default';
import { getGrantApplication } from '@/services/apiService';
import parseCookies from '@/utilities/parseCookies';

function GrantApplication({ error }: { error: number }) {
  const router = useRouter();
  const { t } = useTranslation('grant');

  const { grantRequestSlug } = router.query;

  if (typeof grantRequestSlug !== 'string') {
    throw new Error('Invalid URL');
  }

  const grantRequestSlugSplit = grantRequestSlug.split('-');
  const id = grantRequestSlugSplit[grantRequestSlugSplit.length - 1];
  const numberId = parseInt(id as string, 10);

  const { grant, setGrant, isLoading, refetchGrant } = useGrant(numberId);
  const { status, step } = useGrantStatus();

  const { EDIT, SUBMITTED } = STATUS;

  if (error === 401) {
    return (
      <DefaultLayout>
        <>
          <Head>
            <title>{t('title')}</title>
          </Head>
          <Error401 />
        </>
      </DefaultLayout>
    );
  }

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
                {status === EDIT && <GrantApplicationForm data={grant} setData={setGrant} />}
                {(status === SUBMITTED || step >= 1) && <GrantApplicationDetails data={grant} setData={setGrant} refetchGrant={refetchGrant} />}
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

  if (!id) {
    return {
      notFound: true,
    };
  }

  try {
    await queryClient.fetchQuery(['grant', apiSignature], () => getGrantApplication(apiSignature, id));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e?.response?.status === 401) {
      return {
        props: {
          ...(await serverSideTranslations(locale, ['common', 'grant'])),
          error: 401,
        },
      };
    }

    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'grant'])),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default GrantApplication;
