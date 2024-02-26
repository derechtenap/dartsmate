import type { NextPage } from "next";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";

const CreateProfilePage: NextPage = () => {
  return <>CreateProfilePage</>;
};

export default CreateProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };
