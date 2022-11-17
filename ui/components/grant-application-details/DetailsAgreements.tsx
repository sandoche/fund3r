import { useState } from 'react';
import { Button, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import useAccountSignature from '@/hooks/useAccountSignature';
import { downloadFile } from '@/services/helloSignService';

function DetailsAgreements({ grantId }: { grantId: number | undefined }) {
  const { t } = useTranslation('grant');
  const apiSignature = useAccountSignature();

  const [isLoading, setIsLoading] = useState(false);

  const loadAndDownload = async () => {
    setIsLoading(true);
    await downloadFile(apiSignature, grantId);
    setIsLoading(false);
  };

  return (
    <>
      <Title order={3} mb="lg" mt="xl">
        {t('details.agreements.title')}
      </Title>
      <Button variant="light" color="gray" onClick={loadAndDownload} loading={isLoading} disabled={isLoading}>
        {t('details.agreements.filename')}
      </Button>
    </>
  );
}

export default DetailsAgreements;
