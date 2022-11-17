import { Text } from '@mantine/core';

function LabelValue({ label, value }: { label: string | null | undefined; value: string | null | undefined }) {
  return (
    <div>
      <Text size="xs">{label}</Text>
      <Text weight={500} style={{ wordBreak: 'break-word' }}>
        {value}
      </Text>
    </div>
  );
}

export default LabelValue;
