import { NextPage } from "next";

import { useEffect, useState } from "react";

import fs from "fs";
import os from "os";

const MatchPage: NextPage = () => {
  const [match, setMatch] = useState<Match>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const save = fs.readFileSync(
      `${os.homedir()}/dartmate/CURRENT_MATCH.save`,
      {
        encoding: "utf-8",
      }
    );
    const match: Match = JSON.parse(save);
    setMatch(match);

    sessionStorage.setItem("currentPlayer", match.players[0].uuid);
    sessionStorage.setItem("settings", JSON.stringify(match.settings));
    sessionStorage.setItem("playerList", JSON.stringify(match.players));
    setIsLoading(false);
  }, []);

  if (isLoading) return <>Loading...</>;

  if (match) return <>...</>;
};

export default MatchPage;
