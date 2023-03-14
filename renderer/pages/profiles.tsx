import { NextPage } from "next";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { getProfiles } from "hooks/useQuery";

import Avatar from "@/components/avatars/Avatar";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { deleteProfile } from "utils/profiles/delete";
import Modal from "@/components/Modal";

const ProfilesPage: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<ProfileFile>(undefined);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, data, refetch } = getProfiles();

  if (isLoading) {
    return (
      <main className="flex h-full w-full items-center justify-center">
        <div className="radial-progress animate-spin">
          <span className="sr-only">Loading..</span>
        </div>
      </main>
    );
  }

  const handleDeleteProfile = (profile: ProfileFile) => {
    deleteProfile(profile.uuid).then(() => {
      setCurrentUser(undefined);
      refetch();
    });
  };

  return (
    <SidebarLayout title="Profiles">
      <div className="flex">
        <ul className="menu w-56 bg-base-100">
          {data?.map((profile) => (
            <li key={profile.uuid}>
              <button
                className="flex items-center gap-4"
                onClick={() => setCurrentUser(profile)}
              >
                <Avatar imgSrc={profile.avatar_image} name={profile.name} />
                {profile.name}
              </button>
            </li>
          ))}
        </ul>
        {currentUser ? (
          <>
            <Modal
              state={showModal}
              title={`Do you really want to delete ${currentUser.name}'s profile?`}
            >
              <p>
                This action cannot be undone and all of the data will be
                permanently erased. Please note that this includes profile
                information, preferences, and statistics.
              </p>
              <div className="mt-8 flex justify-between">
                <button
                  className="btn-outline btn btn-error"
                  onClick={() => handleDeleteProfile(currentUser)}
                >
                  Delete Profile
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </Modal>
            <header className="bg-diagonal-lines flex flex-1 items-center justify-between p-8 font-bold">
              <main className="flex items-center gap-8">
                <Avatar
                  imgSrc={currentUser.avatar_image}
                  name={currentUser.name}
                  size="w-24"
                />
                <h1 className="mb-0">{currentUser.name}</h1>
              </main>
              <aside className="flex gap-4">
                <button className="btn-outline btn btn-info btn-sm">
                  <HiPencil className="mr-2" />
                  Edit
                </button>
                <button
                  className="btn-outline btn btn-error btn-sm"
                  onClick={() => setShowModal(true)}
                >
                  <HiTrash className="mr-2" /> Delete
                </button>
              </aside>
            </header>
          </>
        ) : (
          <>EMPTY</>
        )}
      </div>
    </SidebarLayout>
  );
};

export default ProfilesPage;
