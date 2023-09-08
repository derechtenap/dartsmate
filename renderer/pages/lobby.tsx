import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import PageHeader from "@/components/content/PageHeader";
import {
  Avatar,
  Button,
  Grid,
  Group,
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

const LobbyPage: NextPage = () => {
  const { isLoading, isSuccess, data: profiles, refetch } = useProfiles();
  const [matchPlayerList, setMatchPlayerList] = useState<Profile[]>([]);

  const handlePlayerSelection = (profile: Profile) => {
    if (matchPlayerList.includes(profile)) {
      // If the profile is already in the list and user clicks again on the avatar
      // remove the profile from the player list
      setMatchPlayerList((prev) => prev.filter((item) => item !== profile));
      notifications.show({
        color: "red",
        title: `${profile.username} was removed from the next game!`,
        message: "Click on the profile picture again to add them again.",
      });
    } else {
      notifications.show({
        title: `${profile.username} will be in the next game!`,
        message: "Click on the profile picture again to remove them.",
      });
      setMatchPlayerList((prev) => [...prev, profile]);
    }
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
      content: <StepSettings />,
    },
    {
      label: "Start the Game",
      description: "Good Darts!",
      icon: <IconTargetArrow />,
      content: <StepPlay />,
    },
  ];

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  console.info(matchPlayerList);

  return (
    <DefaultLayout>
      <PageHeader title="Lobby">
        <Text pb="xl">
          You are just three steps away from starting your match. Let's get
          started!
        </Text>
        <Stepper
          active={active}
          onStepClick={setActive}
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
          <Button onClick={() => prevStep()} disabled={active === 0}>
            Previous Step
          </Button>
          <Button
            onClick={() => nextStep()}
            disabled={active === steps.length || matchPlayerList.length === 0}
          >
            Next Step
          </Button>
        </Group>
      </PageHeader>
    </DefaultLayout>
  );
};

const StepSettings = () => {
  return <>Settings!</>;
};

const StepPlay = () => {
  return <>Play!</>;
};

export default LobbyPage;
