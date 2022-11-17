import { Button, Center, Container, SimpleGrid, Text, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styles from '@/styles/Home.module.css';

function HomeHero() {
  const { t } = useTranslation('home');

  return (
    <Container size="lg">
      <SimpleGrid cols={2} className={styles.hero} breakpoints={[{ maxWidth: 576, cols: 1 }]}>
        <Center>
          <div>
            <Title order={1} mb={16}>
              {t('hero.headline')}
            </Title>
            <Text mb={16}>{t('hero.description')}</Text>
            <Link href="/grants" passHref>
              <Button component="a" color="dark" radius="xl" size="md">
                {t('hero.call_to_action')}
              </Button>
            </Link>
          </div>
        </Center>
        <Center>
          <div>
            <Image src="/images/illustration.png" alt="Illustration" width={400} height={400} />
          </div>
        </Center>
      </SimpleGrid>
    </Container>
  );
}

export default HomeHero;
