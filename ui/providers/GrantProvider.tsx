import { useMemo, useState } from 'react';

import GrantContext from '@/contexts/GrantContext';
import type { GrantApplicationInterface } from '@/types/GrantApplicationInterface';

const GrantProvider = ({ children }: { children: JSX.Element }) => {
  const [grant, setGrant] = useState<GrantApplicationInterface | null>(null);

  const contextValue = useMemo(() => ({ grant, setGrant }), [grant, setGrant]);

  return <GrantContext.Provider value={contextValue}>{children}</GrantContext.Provider>;
};

export default GrantProvider;
