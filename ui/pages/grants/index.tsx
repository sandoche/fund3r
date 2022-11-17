import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import type { NextApiRequest } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LoadingAnimation from '@/components/common/LoadingAnimation';
import NearAuthenticationGuardWithLoginRedirection from '@/components/common/NearAuthenticationGuardWithLoginRedirection';
import Error401 from '@/components/errors/401';
import Error500 from '@/components/errors/500';
import { COOKIE_SIGNATURE_KEY } from '@/constants';
import useAccountSignature from '@/hooks/useAccountSignature';
import DefaultLayout from '@/layouts/default';
import { getAllGrantApplicationsOfUser } from '@/services/apiService';
import parseCookies from '@/utilities/parseCookies';

function Grants({ error }: { error: number }) {
  const router = useRouter();
  const { t } = useTranslation('grants');
  const apiSignature = useAccountSignature();
  const { data } = useQuery(['grants', apiSignature], () => getAllGrantApplicationsOfUser(apiSignature));

  // Since we currently don't handle multiple grants we will redirect to the first grant
  useEffect(() => {
    if (data && data.length > 0) {
      const grant = data[0];
      router.push(`/grants/${grant.nearId}-${grant.id}`);
    }
  }, [data, router]);

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
            <LoadingAnimation />
          </ErrorBoundary>
        </NearAuthenticationGuardWithLoginRedirection>
      </>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, locale }: { req: NextApiRequest; locale: string }) {
  const queryClient = new QueryClient();
  const data = parseCookies(req);
  const apiSignature = data[COOKIE_SIGNATURE_KEY] ? JSON.parse(data[COOKIE_SIGNATURE_KEY]) : null;

  try {
    await queryClient.fetchQuery(['grants', apiSignature], () => getAllGrantApplicationsOfUser(apiSignature));
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
      ...(await serverSideTranslations(locale, ['common', 'grants'])),
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Grants;
