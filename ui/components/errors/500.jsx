import { Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function Error500() {
  const { t } = useTranslation('common');

  return (
    <Container size="lg">
      <Title>{t('errors.500.title')}</Title>
      <Text>{t('errors.500.description')}</Text>
    </Container>
  );
}

export default Error500;
