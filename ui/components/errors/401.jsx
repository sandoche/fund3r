import { Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function Error401() {
  const { t } = useTranslation('common');

  return (
    <Container size="lg">
      <Title>{t('errors.401.title')}</Title>
      <Text>{t('errors.401.description')}</Text>
    </Container>
  );
}

export default Error401;
