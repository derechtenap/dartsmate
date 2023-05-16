import Image from "next/image";
import { getInitials } from "utils/ui/getInitials";

type Props = {
  dataImage?: string;
  name: string;
};

const Avatar = ({ dataImage, name }: Props) => {
  const nameInitials = getInitials(name);

  if (dataImage)
    return (
      <div className={`avatar  pointer-events-none`}>
        <Image
          alt={`${name}'s avatar`}
          className={`rounded-full `}
          src={dataImage}
          width={32}
          height={32}
        />
      </div>
    );

  // If no image is provided, display a placeholder avatar with user's initials
  // TODO: Add randomized colors instead of `bg-primary`
  return (
    <div className="placeholder avatar">
      <div className={`w-8 h-8 rounded-full bg-primary`}>{nameInitials}</div>
    </div>
  );
};

export default Avatar;
