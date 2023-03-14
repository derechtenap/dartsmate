import { NextPage } from "next";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { getProfiles } from "hooks/useProfileData";

const ProfilesPage: NextPage = () => {
  const { isLoading, isError, data, error } = getProfiles();
  console.info(isLoading, isError, data, error);

  if (isLoading) {
    return (
      <main className="flex h-full w-full items-center justify-center">
        <div className="radial-progress animate-spin">
          <span className="sr-only">Loading..</span>
        </div>
      </main>
    );
  }

  return (
    <SidebarLayout title="Profiles">
      <ul>
        {data?.map((profile) => (
          <li key={profile.uuid}>{profile.name}</li>
        ))}
      </ul>
    </SidebarLayout>
  );
};

export default ProfilesPage;
