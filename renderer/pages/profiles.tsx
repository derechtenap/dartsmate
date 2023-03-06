import { NextPage } from "next";
import { useEffect, useState } from "react";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { loadProfile, readProfileDir } from "utils/profiles/load";

const ProfilesPage: NextPage = () => {
  const [profiles, setProfiles] = useState<ProfileFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProfiles = async () => {
    setProfiles([]);
    const profileList = await readProfileDir();
    profileList.forEach(async (p) => {
      const profile = await loadProfile(p);
      setProfiles((prev) => [...prev, profile]);
    });
  };

  useEffect(() => {
    getProfiles().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <SidebarLayout title="Profiles">
      <aside>
        <ul>
          {profiles.map((p) => (
            <li key={p.uuid}>{p.name}</li>
          ))}
        </ul>
      </aside>
      <h1>Profiles</h1>
    </SidebarLayout>
  );
};

export default ProfilesPage;
