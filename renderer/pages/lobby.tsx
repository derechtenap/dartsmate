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
} from "@mantine/core";
import { useState } from "react";
import {
  IconAdjustmentsHorizontal,
  IconTargetArrow,
  IconUsersPlus,
} from "@tabler/icons-react";
import { useProfiles } from "hooks/useProfiles";
import { Profile } from "types/profile";
import { getUsernameInitials } from "utils/misc/getUsernameInitials";

const LobbyPage: NextPage = () => {
  const { isLoading, isSuccess, data: profiles, refetch } = useProfiles();
  const [matchPlayerList, setMatchPlayerList] = useState([]);
  const steps = [
    {
      label: "Select Players",
      description: "Choose the Players for the Match",
      icon: <IconUsersPlus />,
      content: <StepPlayers isSuccess={isSuccess} profiles={profiles} />,
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
          <Button onClick={() => nextStep()} disabled={active === steps.length}>
            Next Step
          </Button>
        </Group>
      </PageHeader>
    </DefaultLayout>
  );
};

type StepPlayersProps = {
  isSuccess: boolean;
  profiles: Profile[];
};

const StepPlayers = ({ isSuccess, profiles }: StepPlayersProps) => {
  return (
    <ScrollArea type="hover" h="420px">
      <Grid mt="xl" mx="xs">
        {isSuccess
          ? profiles.map((profile) => (
              <Grid.Col span={2} key={profile.uuid}>
                <Stack key={profile.uuid} p="md">
                  <Avatar mx="auto" size="lg" color={profile.color}>
                    {getUsernameInitials(profile.username)}
                  </Avatar>
                  <Text
                    ta="center"
                    tt="uppercase"
                    fw="bold"
                    color="dimmed"
                    size="xs"
                  >
                    {profile.username}
                  </Text>
                </Stack>
              </Grid.Col>
            ))
          : null}
      </Grid>
    </ScrollArea>
  );
};

const StepSettings = () => {
  return <>Settings!</>;
};

const StepPlay = () => {
  return <>Play!</>;
};

export default LobbyPage;
