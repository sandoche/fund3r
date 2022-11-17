import { useState } from 'react';
import type HelloSign from 'hellosign-embedded';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHellosignEmbedded = (signUrl: string | undefined, clientId: string | undefined, options: any = {}) => {
  const [hellosignClient, setHellosignClient] = useState<HelloSign | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const open = () => {
    if (!signUrl) {
      return;
    }

    import('hellosign-embedded')
      .then(({ default: HelloSign }) => {
        return new HelloSign({
          allowCancel: true,
          clientId,
          skipDomainVerification: true,
          ...options,
        });
      })
      .then((client) => {
        setHellosignClient(client);
        setIsLoading(true);
        client.open(signUrl);
      });
  };

  hellosignClient?.on('close', () => {
    setIsLoading(false);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hellosignClient?.on('error', (data: any) => {
    setError(data);
  });

  return {
    hellosignClient,
    open,
    isLoading,
    error,
    setError,
  };
};

export default useHellosignEmbedded;
