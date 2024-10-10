import { Center, Loader, Stack, Text } from "@mantine/core";

const LoadingOverlay = () => {
  return (
    <Center h="100vh">
      <Stack>
        <Loader mx="auto" variant="dots" />
        <Text c="dimmed" fw="bold" fz="sm" tt="uppercase">
          Loading data
        </Text>
      </Stack>
    </Center>
  );
};

export default LoadingOverlay;
