import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useCurrentMatch } from "hooks/useCurrentMatch";
import LoadingOverlay from "@/components/LoadingOverlay";
import type { UUID } from "crypto";

const GameResultsPage: NextPage = () => {
  const router = useRouter();
  const matchQueryUuid = router.query.uuid;
  const {
    isLoading,
    isSuccess,
    data: matchData,
  } = useCurrentMatch(matchQueryUuid as UUID);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (matchData && isSuccess) {
    return (
      <DefaultLayout>
        <Title>Results for {matchData.matchUuid}</Title>
      </DefaultLayout>
    );
  }

  return <>UNABLE TO LOAD MATCH</>;
};

export default GameResultsPage;
