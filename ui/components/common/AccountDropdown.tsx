import { Button, Divider, Menu, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Checklist, ChevronDown, Logout, UserCircle } from 'tabler-icons-react';

import useWallet from '@/modules/near-api-react/hooks/useWallet';
import styles from '@/styles/AccountDropdown.module.css';

function AccountDropdown() {
  const theme = useMantineTheme();
  const wallet = useWallet();
  const { t } = useTranslation('common');

  return (
    <Menu
      control={
        <Button rightIcon={<ChevronDown size={18} />} sx={{ paddingRight: 12 }} variant="light" color="indigo" radius="xl">
          <UserCircle size={22} color="#4c6ef5" />
          &nbsp; {wallet && wallet.isSignedIn() && wallet.getAccountId()}
        </Button>
      }
      transition="pop-top-right"
      placement="end"
      size="lg"
    >
      <Link href="/grants" passHref>
        <Menu.Item component="a" icon={<Checklist size={16} color={theme.colors.violet[6]} />} className={styles.linkmenu}>
          {t('navbar.applications')}
        </Menu.Item>
      </Link>
      <Divider />
      <Link href="/logout" passHref>
        <Menu.Item component="a" icon={<Logout size={16} color={theme.colors.red[6]} />}>
          {t('navbar.signout')}
        </Menu.Item>
      </Link>
    </Menu>
  );
}

export default AccountDropdown;
