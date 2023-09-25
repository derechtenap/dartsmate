import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";
import {
  Avatar,
  Button,
  Checkbox,
  Grid,
  Group,
  NativeSelect,
  ScrollArea,
  Stack,
  Stepper,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useState } from "react";
import {
  IconAdjustmentsHorizontal,
  IconCheck,
  IconTargetArrow,
  IconUsersPlus,
} from "@tabler/icons-react";
import { useProfiles } from "hooks/useProfiles";
import { Profile } from "types/profile";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { Match } from "types/match";
import { randomUUID } from "crypto";
import { createFile } from "utils/fs/createFile";
import { MATCHES_DIR, MATCH_FILENAME_EXTENSION } from "utils/constants";
import path from "path";
import { useRouter } from "next/router";
import pkg from "../../package.json";

const LobbyPage: NextPage = () => {
  const router = useRouter();
  const { isSuccess, data: profiles } = useProfiles();
  const [matchPlayerList, setMatchPlayerList] = useState<Profile[]>([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const form = useForm<Match>({
    initialValues: {
      appVersion: pkg.version,
      createdAt: Date.now(),
      profiles: matchPlayerList,
      updatedAt: Date.now(),
      matchUuid: randomUUID(),
      matchRounds: [],
      matchStatus: "STARTED",
      matchType: 501,
      checkout: "Double",
      // randomizePlayerOrder: false,
      disabledStatistics: false,
    },

    validate: {},
  });

  const handlePlayerSelection = (profile: Profile) => {
    let updatedList: Profile[];

    const NOTIFICATION_REMOVE_PLAYER = {
      color: "red",
      title: `${profile.username} was removed from the next game!`,
      message: "Click on the profile picture again to add them again.",
    };

    const NOTIFICATION_ADD_PLAYER = {
      title: `${profile.username} will be in the next game!`,
      message: "Click on the profile picture again to remove them.",
    };

    setMatchPlayerList((prev) => {
      if (prev.includes(profile)) {
        // If the profile is already in the list and the user clicks again on the avatar,
        // remove the profile from the player list
        notifications.show(NOTIFICATION_REMOVE_PLAYER);
        updatedList = prev.filter(
          (removedProfile) => removedProfile !== profile
        );
      } else {
        // Add player to the match
        notifications.show(NOTIFICATION_ADD_PLAYER);
        updatedList = [...prev, profile];
      }

      // Update states
      form.setFieldValue("profiles", updatedList);
      return updatedList;
    });
  };

  const handleStartMatch = () => {
    const saveGameData = form.values;

    createFile(
      path.join(MATCHES_DIR, saveGameData.matchUuid + MATCH_FILENAME_EXTENSION),
      JSON.stringify(saveGameData)
    );

    void router.push(`/match/${saveGameData.matchUuid}/playing`);
  };

  const steps = [
    {
      label: "Select Players",
      description: "Choose the Players for the Match",
      icon: <IconUsersPlus />,
      content: (
        <ScrollArea type="hover" h="420px">
          <Grid mt="xl" mx="xs">
            {isSuccess
              ? profiles.map((profile) => (
                  <Grid.Col span={2} key={profile.uuid}>
                    <UnstyledButton
                      display="block"
                      mx="auto"
                      p="md"
                      onClick={() => handlePlayerSelection(profile)}
                    >
                      <Stack key={profile.uuid}>
                        <Avatar mx="auto" size="lg" color={profile.color}>
                          {matchPlayerList.includes(profile) ? (
                            <IconCheck />
                          ) : (
                            getUsernameInitials(profile.username)
                          )}
                        </Avatar>
                        <Text
                          ta="center"
                          tt="uppercase"
                          fw="bold"
                          color={
                            matchPlayerList.includes(profile)
                              ? "white"
                              : "dimmed"
                          }
                          size="xs"
                        >
                          {profile.username}
                        </Text>
                      </Stack>
                    </UnstyledButton>
                  </Grid.Col>
                ))
              : null}
          </Grid>
        </ScrollArea>
      ),
    },
    {
      label: "Configure Settings",
      description: "Review and Adjust Match Settings",
      icon: <IconAdjustmentsHorizontal />,
      content: (
        <form>
          <Stack>
            <NativeSelect
              {...form.getInputProps("matchType")}
              data={["901", "701", "501", "301"]}
              label="Match Type"
            />
            <NativeSelect
              data={["Triple", "Double", "Single", "Any"]}
              label="Checkout"
              {...form.getInputProps("checkout")}
            />
            <Checkbox
              disabled
              label="Randomize Player Order"
              {...form.getInputProps("randomizePlayerOrder")}
            />
            <Checkbox
              label="Disable Statistics"
              {...form.getInputProps("disabledStatistics")}
            />
          </Stack>
        </form>
      ),
    },
    {
      label: "Start the Game",
      description: "Good Darts!",
      icon: <IconTargetArrow />,
      content: <Button onClick={() => handleStartMatch()}>Start Match!</Button>,
    },
  ];

  const moveToNextStep = () => {
    setActiveStepIndex((cur) => (cur < steps.length ? cur + 1 : cur));
  };

  const moveToPrevStep = () => {
    setActiveStepIndex((cur) => (cur > 0 ? cur - 1 : cur));
  };

  return (
    <DefaultLayout>
      <PageHeader title="Lobby">
        <Text pb="xl">
          You are just three steps away from starting your match. Let's get
          started!
        </Text>
        <Stepper
          active={activeStepIndex}
          onStepClick={setActiveStepIndex}
          breakpoint="sm"
          mt="xl"
          allowNextStepsSelect={false}
        >
          {steps.map((step) => (
            <Stepper.Step
              description={step.description}
              icon={step.icon}
              key={step.label}
              label={step.label}
            >
              {step.content}
            </Stepper.Step>
          ))}
        </Stepper>

        <Group mt="lg">
          <Button
            onClick={() => moveToPrevStep()}
            disabled={activeStepIndex === 0}
          >
            Previous Step
          </Button>
          <Button
            onClick={() => moveToNextStep()}
            disabled={
              activeStepIndex === steps.length - 1 ||
              matchPlayerList.length === 0
            }
          >
            Next Step
          </Button>
        </Group>
      </PageHeader>
    </DefaultLayout>
  );
};

export default LobbyPage;
