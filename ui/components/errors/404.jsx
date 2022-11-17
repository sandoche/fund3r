import { Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function Error404() {
  const { t } = useTranslation('common');

  return (
    <Container size="lg">
      <Title>{t('errors.404.title')}</Title>
      <Text>{t('errors.404.description')}</Text>
    </Container>
  );
}

export default Error404;
