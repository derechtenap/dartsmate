import type { NextPage } from "next";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import {
  Avatar,
  BackgroundImage,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconUserPlus } from "@tabler/icons-react";
import { useTranslation } from "next-i18next";
import sendIPC from "utils/ipc/send";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";

const CreateProfilePage: NextPage = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  interface FormValues {
    color: string;
    name: {
      firstName: string;
      lastName: string;
    };
    username: string;
  }

  const form = useForm<FormValues>({
    initialValues: {
      color: "red",
      name: {
        firstName: "",
        lastName: "",
      },
      username: "",
    },
    validate: {
      name: {
        firstName: isNotEmpty(),
        lastName: isNotEmpty(),
      },
      username: isNotEmpty(),
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        closeOnClickOutside={false}
        fullScreen
      >
        <Stack maw={600} mx="auto" gap="xl">
          <Title>Welcome! Let's Create Your Profile</Title>
          <Text>
            Get started by entering your details. All data is stored locally and
            wont be uploaded to the internet!
          </Text>
          <Divider />
          <Avatar
            color={form.getInputProps("color").value as string}
            size="xl"
            mx="auto"
          >
            {getUsernameInitials(
              form.getInputProps("username").value as string
            )}
          </Avatar>
          <Group grow>
            <TextInput
              data-autofocus
              label="First Name"
              placeholder="John"
              {...form.getInputProps("name.firstName")}
            />
            <TextInput
              label="Last Name"
              placeholder="Marston"
              {...form.getInputProps("name.lastName")}
            />
          </Group>
          <TextInput
            label="Username"
            placeholder="Johnny Boy"
            {...form.getInputProps("username")}
          />
          <Divider />
          <Button disabled={!form.isValid()}>Create Profile</Button>
        </Stack>
      </Modal>
      <Grid mah="100vh" p={0} m={0} gutter={0}>
        <Grid.Col h="100vh" span={6} m={0} p={0}>
          <BackgroundImage src="/images/dartboard.jpg" h="100%" />
        </Grid.Col>
        <Grid.Col span="auto">
          <Center h="100vh" p="xl" maw={800}>
            <Stack gap="xl">
              <Title fw="bold">Welcome to Dartsmate!</Title>
              <Text c="dimmed" fz="xl">
                Your perfect companion for all things darts! Whether you're a
                casual player or a seasoned pro, Dartsmate is here to enhance
                your darting experience. Let the matches begin!
              </Text>
              <Group>
                <Button
                  tt="uppercase"
                  w="fit-content"
                  leftSection={<IconUserPlus />}
                  onClick={open}
                >
                  Create a Profile
                </Button>
                <Button
                  c="dimmed"
                  variant="transparent"
                  onClick={() => sendIPC("close-app")}
                >
                  {t("closeApp")}
                </Button>
              </Group>
            </Stack>
          </Center>
        </Grid.Col>
      </Grid>{" "}
    </>
  );
};

export default CreateProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };
