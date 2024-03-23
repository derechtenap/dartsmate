// import { useTranslation } from 'react-i18next'
import { ActionIcon, Avatar, Group, Stack, Text, Title, Tooltip } from '@mantine/core'
import DefaultLayout from '../components/layouts/Default'
import { IconEdit, IconTrash } from '@tabler/icons-react'

function ProfilePage(): JSX.Element {
  // const { t, i18n } = useTranslation()

  return (
    <DefaultLayout withNavbarOpen>
      <Group p="lg">
        <Avatar color="blue" size="xl" src="" variant="filled">
          P_N
        </Avatar>
        <Stack gap={0}>
          <Title>PLAYER_NAME</Title>
          <Text c="dimmed" size="sm">
            Playing since {Date.now()}
          </Text>
        </Stack>
        <Group gap="xs" ml="auto">
          <ActionIcon c="gray" variant="transparent">
            <Tooltip label="Edit Profile" withArrow>
              <IconEdit />
            </Tooltip>
          </ActionIcon>
          <ActionIcon>
            <Tooltip label="Delete Profile" withArrow>
              <IconTrash />
            </Tooltip>
          </ActionIcon>
        </Group>
      </Group>
    </DefaultLayout>
  )
}

export default ProfilePage
