import Image from "next/image";
import { getInitials } from "utils/ui/getInitials";

type Props = {
  dataImage?: string;
  name: string;
  size?: string;
};

const Avatar = ({ dataImage, name, size = "w-8" }: Props) => {
  const nameInitials = getInitials(name);

  if (dataImage)
    return (
      <div className={`avatar ${size} pointer-events-none`}>
        <Image
          alt={`${name}'s avatar`}
          className="rounded-full"
          src={dataImage}
          width={64}
          height={64}
        />
      </div>
    );

  // TODO: Add randomized colors instead of `bg-primary`
  return (
    <div className="placeholder avatar">
      <div className={`${size} rounded-full bg-primary`}>{nameInitial}</div>
    </div>
  );
};

export default Avatar;
