import { NextPage } from "next";

import SidebarLayout from "@/components/layouts/SidebarLayout";
import { loadProfile } from "utils/profiles/load";

const ProfilesPage: NextPage = () => {
  const getProfile = async () => {
    console.log(await loadProfile("9272980a-d8cd-410b-bf3c-db267e98e7cd"));
  };

  getProfile();
  return (
    <SidebarLayout title="Profiles">
      <h1>Profiles</h1>
    </SidebarLayout>
  );
};

export default ProfilesPage;
