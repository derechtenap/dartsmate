import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useFullscreen } from "@mantine/hooks";
import {
  IconWindowMaximize,
  IconWindowMinimize,
  IconX,
} from "@tabler/icons-react";
import { APP_NAME } from "utils/constants";
import { closeApp } from "utils/misc/closeApp";

export const LayoutControls = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { toggle, fullscreen } = useFullscreen();

  console.info(fullscreen);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        radius="xs"
        shadow="lg"
        transitionProps={{ transition: "fade", duration: 200 }}
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 1,
        }}
        withCloseButton={false}
      >
        <Stack>
          <Title tt="uppercase" fz="xl">
            Close {APP_NAME}?
          </Title>
          <Text>
            Any unsaved data will be lost. Are you sure you want to quit the
            app?
          </Text>
          <Group grow mt="lg">
            <Button
              autoContrast
              color="red"
              onClick={() => closeApp()}
              variant="filled"
            >
              Quit
            </Button>
            <Button autoContrast onClick={() => void close()} variant="default">
              Keep Open
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Group>
        <Tooltip label={fullscreen ? "Minimize Window" : "Maximize Window"}>
          <ActionIcon
            c="gray"
            variant="transparent"
            onClick={() => void toggle()}
          >
            {fullscreen ? <IconWindowMinimize /> : <IconWindowMaximize />}
          </ActionIcon>
        </Tooltip>
        <Tooltip label={`Close ${APP_NAME}`}>
          <ActionIcon c="gray" onClick={() => open()} variant="transparent">
            <IconX />
          </ActionIcon>
        </Tooltip>
      </Group>
    </>
  );
};

export default LayoutControls;
