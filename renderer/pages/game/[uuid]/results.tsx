import { NextPage } from "next";
import Button from "@/components/Button";
import { useRouter } from "next/router";

const GameResults: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <h1>Results</h1>
      <Button action={() => router.push("/")} styles="btn">
        Back To Index Page
      </Button>
    </>
  );
};

export default GameResults;
