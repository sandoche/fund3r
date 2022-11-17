import { Badge, Group, Text, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { GrantCategories, GrantTypes, OpenSourceStates } from '@/types/GrantApplicationInterface';

function DetailsHeader({
  projectName,
  email,
  firstname,
  lastname,
  grantCategory,
  grantType,
  openSourceState,
}: {
  projectName: string | undefined;
  email: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  grantCategory: GrantCategories | undefined;
  grantType: GrantTypes | undefined;
  openSourceState: OpenSourceStates | undefined;
}) {
  const { t } = useTranslation('grant');

  return (
    <>
      <Title mb="lg">{projectName}</Title>
      <Text mb="lg">
        {t('details.header.by')} {firstname} {lastname} | {email}
      </Text>
      <Group>
        <Badge color="gray" size="lg">
          {t(`form.labels.${grantCategory}`)}
        </Badge>

        <Badge color="gray" size="lg">
          {t(`form.labels.${grantType}`)}
        </Badge>

        <Badge color="gray" size="lg">
          {t(`form.labels.${openSourceState}`)}
        </Badge>
      </Group>
    </>
  );
}

export default DetailsHeader;
