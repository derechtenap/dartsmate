import Image from "next/image";

type Props = {
  dataImage?: string;
  name: string;
  size?: string;
};

const Avatar = ({ dataImage, name, size = "w-8" }: Props) => {
  // Get the initiales to place them dynamically into a placeholder avatar
  // eg. Luke Skywalker => "LS" or C-3PO => "C"
  const nameInitial = name
    .split(" ")
    .map((char) => char.charAt(0))
    .slice(0, 3) // Return only the first 3 characters to avoid overflowing
    .join("");

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
