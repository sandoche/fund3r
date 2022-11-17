import { Button } from '@mantine/core';

import useWallet from '@/modules/near-api-react/hooks/useWallet';

interface SignInOptionsInterface {
  contractId: string | undefined;
  methodNames: string[];
  successUrl: string;
  failureUrl: string;
}

const NearConnectButton = ({ children, signInOptions, appName }: { children: JSX.Element; signInOptions: SignInOptionsInterface; appName: string | undefined }) => {
  const wallet = useWallet();

  const signIn = () => wallet && wallet.requestSignIn(signInOptions, appName);
  return (
    <Button color="violet" onClick={() => signIn()}>
      {children}
    </Button>
  );
};

export default NearConnectButton;
