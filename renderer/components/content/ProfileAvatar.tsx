import { Avatar } from '@mantine/core'
import type { AvatarProps } from '@mantine/core'
import { Profile } from 'types/profile'
import { getUsernameInitials } from 'utils/misc/getUsernameInitials'

interface ProfileAvatarProps extends AvatarProps {
  profile: Profile
}

const ProfileAvatar = ({ profile, ...mantineAvatarProps }: ProfileAvatarProps) => {
  return (
    <Avatar color={profile.color} {...mantineAvatarProps}>
      {getUsernameInitials(profile.username)}
    </Avatar>
  )
}

export default ProfileAvatar
