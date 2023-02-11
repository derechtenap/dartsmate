type Props = {
  imgSrc?: string;
  name: string;
};

const Avatar = ({ imgSrc, name }: Props) => {
  // Get the initiales to place them dynamically into a placeholder avatar
  // eg. Luke Skywalker => "LS" or C-3PO => "C"
  const nameInitial = name
    .split(" ")
    .map((char) => char.charAt(0))
    .join("");

  if (imgSrc)
    return (
      <div className="avatar w-12">
        <img alt={`${name}'s avatar`} className="rounded-full" src={imgSrc} />
      </div>
    );

  // TODO: Add randomized colors instead of `bg-primary`
  return (
    <div className="placeholder avatar">
      <div className="w-12 rounded-full bg-primary">{nameInitial}</div>
    </div>
  );
};

export default Avatar;
