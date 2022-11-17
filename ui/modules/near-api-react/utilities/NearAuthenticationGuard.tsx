import useWallet from '../hooks/useWallet';

function NearAuthenticationGuard({ children, loggedInCallback }: { children: JSX.Element; loggedInCallback: () => void }) {
  const wallet = useWallet();

  if (wallet && wallet.isSignedIn()) {
    return children;
  } else {
    loggedInCallback();
    return null;
  }
}

export default NearAuthenticationGuard;
