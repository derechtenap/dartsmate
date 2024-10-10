// import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout from "@/components/layouts/Default";
import { Stack } from "@mantine/core";
import HorizontalScrollContainer from "@/components/content/horizontalScroll/HorizontalScrollContainer";
import { useDefaultProfile } from "hooks/useDefaultProfile";
import HeaderGreeting from "@/components/HeaderGreeting";

const IndexPage = () => {
  // const { t } = useTranslation();
  const { data: defaultProfile } = useDefaultProfile();

  return (
    <DefaultLayout withNavbarOpen={false}>
      <Stack my="lg">
        <HeaderGreeting firstName={defaultProfile?.name.firstName} />
        <HorizontalScrollContainer></HorizontalScrollContainer>
      </Stack>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };
