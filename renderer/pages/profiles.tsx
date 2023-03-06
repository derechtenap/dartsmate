import { NextPage } from "next";

import SidebarLayout from "@/components/layouts/SidebarLayout";
import { loadAllProfiles } from "utils/profiles/loadProfile";

const ProfilesPage: NextPage = () => {
  const profiles = loadAllProfiles();

  console.info(profiles);
  return (
    <SidebarLayout title="Profiles">
      <h1>Profiles</h1>
    </SidebarLayout>
  );
};

export default ProfilesPage;
