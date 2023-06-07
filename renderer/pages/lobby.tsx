import type { NextPage } from "next";

import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";

import { IconSettings, IconUserCircle } from "@tabler/icons-react";

import DefaultLayout from "@/components/layouts/Default";

const Lobby: NextPage = () => {
  return (
    <DefaultLayout>
      <Box>
        <Title mb="sm">Lobby</Title>
        <Tabs defaultValue="players">
          <Tabs.List position="center">
            <Tabs.Tab value="players" icon={<IconUserCircle />}>
              Players
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings />}>
              Lobby Settings
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel mt="xl" value="players">
            <Text align="right" fz="sm" mb="xl">
              3 / 8 Players
            </Text>
            <SimpleGrid cols={4}>
              <Card>
                <Stack align="center">
                  <Avatar color="blue" radius="xl" size="lg">
                    n
                  </Avatar>

                  <Text align="center">nap</Text>
                </Stack>
              </Card>
            </SimpleGrid>
          </Tabs.Panel>
          <Tabs.Panel mt="xl" value="settings">
            <Container>
              <SimpleGrid cols={3} mb="xl">
                <Select
                  label="Game Mode"
                  value="501"
                  defaultValue="501"
                  data={[
                    {
                      value: "701",
                      label: "701",
                    },
                    {
                      value: "501",
                      label: "501",
                    },
                    {
                      value: "301",
                      label: "301",
                    },
                  ]}
                />
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={10}
                  value={1}
                  label="Legs"
                />
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={10}
                  value={1}
                  label="Sets"
                />
                <NumberInput
                  defaultValue={2}
                  min={1}
                  max={8}
                  value={2}
                  label="Players"
                />
              </SimpleGrid>
              <SimpleGrid mb="xl">
                <Checkbox label="Randomize Player Order" />
                <Checkbox label="Deactivate Statistics" />
              </SimpleGrid>
              <Group>
                <Button variant="light">Save Settings As Preset</Button>
                <Button variant="default">Reset Settings</Button>
              </Group>
            </Container>
          </Tabs.Panel>
        </Tabs>
      </Box>
    </DefaultLayout>
  );
};

export default Lobby;
