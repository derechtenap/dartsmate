import { HiArrowRight } from "react-icons/hi";
import Avatar from "../avatars/Avatar";
import SlideContainer from "./utils/SlideContainer";

type Props = {
  playerList: { avatar: string; name: string }[];
  savedAt: Date;
};

const UnfinishedGameCta = ({ playerList, savedAt }: Props) => {
  const rtf = new Intl.RelativeTimeFormat("en", {
    localeMatcher: "best fit", // other values: "lookup"
    numeric: "always", // other values: "auto"
    style: "long", // other values: "short" or "narrow"
  });

  return (
    <SlideContainer>
      <h1 className="mb-4 text-6xl font-bold text-white">
        Hey, we found a unfinished Game!
      </h1>
      <p className="mb-8 text-2xl">
        Would you like to continue playing this game?
      </p>

      <main className="flex items-center gap-16">
        <div className="avatar-group -space-x-6">
          {playerList.map((player) => (
            <Avatar
              imgSrc={player.avatar}
              key={player.name}
              name={player.name}
            />
          ))}
        </div>
        <p className="italic">Played {rtf.format(-2, "day")}</p>
      </main>
      <div className="divider my-6" />
      <button className="btn-primary btn-lg btn  text-white">
        <HiArrowRight className="mr-2" /> Continue Game
      </button>
    </SlideContainer>
  );
};

export default UnfinishedGameCta;
