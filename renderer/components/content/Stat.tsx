import { NumberFormatter, Stack, Text } from "@mantine/core";
import type { NumberFormatterProps } from "@mantine/core";

type StatProps = {
  text: string;
  value: number;
  numberProps?: NumberFormatterProps;
};

const Stat = ({ text, value, numberProps }: StatProps) => {
  return (
    <Stack gap="xs">
      <Text c="dimmed" fz="xs">
        {text}
      </Text>
      <Text fw="bold" ff="mono" fz="xl">
        <NumberFormatter {...numberProps} value={value} />
      </Text>
    </Stack>
  );
};

export default Stat;
