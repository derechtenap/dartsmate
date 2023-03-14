import { NextPage } from "next";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { loadProfile, readProfileDir } from "utils/profiles/load";

import { useQuery, useQueryClient } from "@tanstack/react-query";

const ProfilesPage: NextPage = () => {
  const queryClient = useQueryClient();
  console.info(queryClient);

  const getProfiles = async () => {
    const getProfileList = await readProfileDir();

    return Promise.all(
      getProfileList.map(async (p) => {
        return loadProfile(p);
      })
    );
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
    select: (data) => data as ProfileFile[],
  });

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
