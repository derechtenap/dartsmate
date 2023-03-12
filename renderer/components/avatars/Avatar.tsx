type Props = {
  imgSrc?: string;
  name: string;
  size?: string;
};

const Avatar = ({ imgSrc, name, size = "w-8" }: Props) => {
  // Get the initiales to place them dynamically into a placeholder avatar
  // eg. Luke Skywalker => "LS" or C-3PO => "C"
  const nameInitial = name
    .split(" ")
    .map((char) => char.charAt(0))
    .slice(0, 3) // Return only the first 3 characters to avoid overflowing
    .join("");

  if (imgSrc)
    return (
      <div className={`avatar ${size} pointer-events-none`}>
        <img alt={`${name}'s avatar`} className="rounded-full" src={imgSrc} />
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
