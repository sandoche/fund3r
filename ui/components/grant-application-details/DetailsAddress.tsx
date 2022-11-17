import { SimpleGrid, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import LabelValue from '@/components/common/LabelValue';
import getCountry from '@/utilities/getCountry';

function DetailsAddress({
  addressCountry,
  addressCity,
  addressStreet,
  addressZip,
}: {
  addressCountry: string | undefined;
  addressCity: string | undefined;
  addressStreet: string | undefined;
  addressZip: string | undefined;
}) {
  const { t } = useTranslation('grant');

  return (
    <>
      <Title order={3} mb="lg" mt="xl">
        {t('details.address.title')}
      </Title>
      <SimpleGrid cols={2}>
        <LabelValue label={t('form.addressCountry.label')} value={getCountry(addressCountry)} />
        <LabelValue label={t('form.addressCity.label')} value={addressCity} />
        <LabelValue label={t('form.addressStreet.label')} value={addressStreet} />
        <LabelValue label={t('form.addressZip.label')} value={addressZip} />
      </SimpleGrid>
    </>
  );
}

export default DetailsAddress;
