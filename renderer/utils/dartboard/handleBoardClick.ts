let roundThrows = 0;
let roundScore = 0;

export const handleBoardClick = (
  e:
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
    | React.MouseEvent<SVGCircleElement, MouseEvent>
    | React.MouseEvent<SVGUseElement, MouseEvent>
) => {
  const { score, zone } = e.currentTarget.dataset;
  const settings: Settings = JSON.parse(sessionStorage.getItem("settings"));
  const playerList: PlayerList = JSON.parse(
    sessionStorage.getItem("playerList")
  );
  const currentPlayer = sessionStorage.getItem("currentPlayer"); // uuid: string

  // TODO: Handle errors with a modal containing user-friendly
  // error messages and a redirect to the index or lobby page...
  if (!score || !zone)
    throw new Error(
      `score or zone is undefined! (score=${score}, zone=${zone})`
    );

  if (!settings || !playerList || !currentPlayer)
    throw new Error(
      "Couldn't load settings, playerList or currentPlayer! Is the Session Storage empty?"
    );

  // Game loop starts here
  if (roundThrows < 3) {
    // Normally you throw three darts per round
    console.info(
      `Player ${currentPlayer} hit ${zone}, which is worth ${score} points!`
    );

    roundThrows++;
  } else {
    console.info(`Player ${currentPlayer} has thrown three times!`);
    // TODO: Update currentPlayer here...

    roundThrows = 0;
  }
};
