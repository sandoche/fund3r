import { Center, Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import NearConnectButton from '@/components/common/NearConnectButton';
import signInOptions from '@/config/near';
import { APP_NAME } from '@/constants';
import styles from '@/styles/Login.module.css';

function LoginContent() {
  const { t } = useTranslation('login');

  return (
    <Container size="lg">
      <Center className={styles.container}>
        <Text align="center">
          <Title order={1} mb={16}>
            {t('headline')}
          </Title>
          <Text mb={16}>{t('description')}</Text>
          <NearConnectButton signInOptions={signInOptions} appName={APP_NAME}>
            {t('call_to_action')}
          </NearConnectButton>
        </Text>
      </Center>
    </Container>
  );
}

export default LoginContent;
