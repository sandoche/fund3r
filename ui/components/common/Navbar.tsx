import { Button, Container, createStyles, Group, Header } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import AccountDropdown from '@/components/common/AccountDropdown';
import useWallet from '@/modules/near-api-react/hooks/useWallet';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  branding: {
    display: 'inline-flex',
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25) : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

function Navbar() {
  const { classes } = useStyles();
  const { t } = useTranslation('common');
  const wallet = useWallet();

  return (
    <Header height={60} mb="xl">
      <Container className={classes.header} size="lg">
        <Link href="/" passHref>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className={classes.branding}>
            <Image src="/images/logo.svg" height={30} width={100} />
          </a>
        </Link>
        <Group spacing={5}>
          {wallet && wallet.isSignedIn() ? (
            <AccountDropdown />
          ) : (
            <Link href="/grants" passHref>
              <Button component="a" variant="light" color="violet">
                {t('navbar.call_to_action')}
              </Button>
            </Link>
          )}
        </Group>
      </Container>
    </Header>
  );
}

export default Navbar;
