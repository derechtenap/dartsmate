export const handleBoardClick = (
  e:
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
    | React.MouseEvent<SVGCircleElement, MouseEvent>
    | React.MouseEvent<SVGUseElement, MouseEvent>
) => {
  const { score, zone } = e.currentTarget.dataset;
  const settings = JSON.parse(sessionStorage.getItem("settings"));
  const playerList = JSON.parse(sessionStorage.getItem("playerList"));
  const currentPlayer = sessionStorage.getItem("currentPlayer"); // uuid: string

  // TODO: Handle errors with a modal containing  user-friendly
  // error messages and a redirect to the index or lobby page...
  if (!score || !zone)
    throw new Error(
      `score or zone is undefined! (score=${score}, zone=${zone})`
    );

  if (!settings || !playerList || !currentPlayer)
    throw new Error(
      "Couldn't load settings, playerList or currentPlayer! Is the Session Storage empty?"
    );

  console.info(parseInt(score), zone, settings, playerList);

  /* TODO: Next steps:
   * (1) Get current player
   * (2) Get settings (eg. when the game is won, legs, ...)
   * (3) Add each throw/score to a array and check if the player can win
   * Future: Write zones to array (for heatmaps...)
   */
};
