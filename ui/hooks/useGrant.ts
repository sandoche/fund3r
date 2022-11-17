import { useContext } from 'react';
import { useQuery } from 'react-query';

import GrantContext from '@/contexts/GrantContext';
import useAccountSignature from '@/hooks/useAccountSignature';
import { getGrantApplication } from '@/services/apiService';

const useGrant = (grantId: number) => {
  const context = useContext(GrantContext);

  if (context === undefined) {
    throw new Error(`useGrant must be used within a GrantProvider`);
  }

  const { grant, setGrant } = context;
  const apiSignature = useAccountSignature();

  const { isLoading, refetch: refetchGrant } = useQuery(['grant', apiSignature, grantId], () => getGrantApplication(apiSignature, grantId), {
    refetchOnWindowFocus: false,
    onSuccess: (updatedGrantData) => {
      setGrant(updatedGrantData);
    },
  });

  return {
    grant,
    setGrant,
    isLoading,
    refetchGrant,
  };
};

export default useGrant;
