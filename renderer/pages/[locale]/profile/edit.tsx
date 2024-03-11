import type { NextPage } from "next";
import DefaultLayout from "@/components/layouts/Default";
import { getStaticPaths, makeStaticProperties } from "lib/get-static";
import { useTranslation } from "next-i18next";

const EditProfilePage: NextPage = () => {
  const { t } = useTranslation();

  return <DefaultLayout withNavbarOpen>EditProfilePage</DefaultLayout>;
};

export default EditProfilePage;

export const getStaticProps = makeStaticProperties(["common", "profile"]);

export { getStaticPaths };
