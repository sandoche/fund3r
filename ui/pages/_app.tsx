import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { KycDaoProvider } from 'kycdao-react-sdk';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';

import NearProvider from '@/modules/near-api-react/providers/NearProvider';
import GrantProvider from '@/providers/GrantProvider';

// if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_MOCK_API) {
if (process.env.NEXT_PUBLIC_MOCK_API === 'true') {
  /* eslint-disable */
  const { setupWorker } = require('../__tests__/mocks');
  /* eslint-enable */
  setupWorker();
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  const [queryClient] = useState(() => new QueryClient());
  const nearNetworkEnv = process.env.NEXT_PUBLIC_NEAR_NETWORK_ENV || 'testnet';

  return (
    <>
      <Head>
        <title>FUND3R</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <NextNProgress options={{ showSpinner: false }} color="#924fff" height={2} />

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider>
          <NearProvider networkId={nearNetworkEnv}>
            <KycDaoProvider networkId={nearNetworkEnv} config={{}}>
              <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                  <CookiesProvider>
                    <GrantProvider>
                      <Component {...pageProps} />
                    </GrantProvider>
                  </CookiesProvider>
                </Hydrate>
              </QueryClientProvider>
            </KycDaoProvider>
          </NearProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
};

export default appWithTranslation(App);
