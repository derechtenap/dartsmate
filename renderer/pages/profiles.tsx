import { NextPage } from "next";
import { useEffect, useState } from "react";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { loadProfile, readProfileDir } from "utils/profiles/load";
import Link from "next/link";
import Avatar from "@/components/avatars/Avatar";
import { HiPlusCircle, HiUsers } from "react-icons/hi";

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
      <div className="flex h-full">
        <aside className="h-full w-64 overflow-y-auto bg-base-200">
          <ul className="menu">
            <li className="bg-primary font-semibold">
              <Link href="#">
                <span className="flex items-center">
                  <HiPlusCircle className="h-8 w-8" />
                  Create a new Profile
                </span>
              </Link>
            </li>
            {profiles.map((p) => (
              <li
                className="bg-transparent odd:bg-base-300 hover:bg-base-100"
                key={p.uuid}
              >
                <Link href="#">
                  <span className="flex min-w-0">
                    <Avatar imgSrc={p.avatarImage} name={p.name} />
                    <span className="flex-1 truncate">{p.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex h-full w-full flex-1 items-center justify-center">
          <div className="bg-diagonal-lines w-3/4 max-w-2xl rounded-lg px-4 py-8 text-center">
            <HiUsers className="mx-auto mb-8 text-7xl" />
            <h1 className="text-xl">
              Please select a profile from the sidebar or create a new profile.
            </h1>
          </div>
        </main>
      </div>
    </SidebarLayout>
  );
};

export default ProfilesPage;
