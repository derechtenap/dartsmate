import { NextPage } from "next";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { getProfiles } from "hooks/useQuery";

import Avatar from "@/components/avatars/Avatar";
import { useState } from "react";
import { HiPencil, HiPlusCircle, HiTrash } from "react-icons/hi";
import { deleteProfile } from "utils/profiles/delete";
import Modal from "@/components/Modal";
import { useRouter } from "next/router";

const ProfilesPage: NextPage = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<ProfileFile>(undefined);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, data, refetch } = getProfiles();

  const handleDeleteProfile = (profile: ProfileFile) => {
    deleteProfile(profile.uuid).then(() => {
      setCurrentUser(undefined);
      setShowModal(false);
      refetch();
    });
  };

  const DeleteModal = () => {
    return (
      <div className="absolute top-0 z-50 h-screen w-screen" role="alert">
        <Modal
          state={showModal}
          title={`Do you really want to delete ${currentUser.name}'s profile?`}
        >
          <p>
            This action cannot be undone and all of the data will be permanently
            erased. Please note that this includes profile information,
            preferences, and statistics.
          </p>
          <div className="mt-8 flex justify-between">
            <button
              className="btn-outline btn-error btn"
              onClick={() => handleDeleteProfile(currentUser)}
            >
              Delete Profile
            </button>
            <button
              className="btn-ghost btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  };

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
      {showModal && <DeleteModal />}
      <div className={`flex ${showModal ? "blur-sm" : ""}`}>
        <ul className="menu max-h-screen w-56 flex-none overflow-x-hidden overflow-y-scroll bg-base-100">
          <li>
            <button
              className="gap-2"
              onClick={() => router.push("profiles/createProfile")}
            >
              <HiPlusCircle className="h-8 w-8" /> Create Profile
            </button>
          </li>
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
            <header className="bg-diagonal-lines flex h-48 flex-1 items-center justify-between p-8 font-bold">
              <main className="flex items-center gap-8">
                <Avatar
                  imgSrc={currentUser.avatar_image}
                  name={currentUser.name}
                  size="w-24"
                />
                <h1 className="mb-0">{currentUser.name}</h1>
              </main>
              <aside className="flex gap-4">
                <button
                  className="btn-outline btn-info btn-sm btn"
                  onClick={() =>
                    router.push(`/profiles/edit/${currentUser.uuid}`)
                  }
                  type="button"
                >
                  <HiPencil />
                </button>
                <button
                  className="btn-outline btn-error btn-sm btn"
                  onClick={() => setShowModal(true)}
                  type="button"
                >
                  <HiTrash />
                </button>
              </aside>
            </header>
          </>
        ) : (
          <div className="h-sc bg-diagonal-lines flex h-screen flex-1 flex-col items-center justify-center">
            <p className="mb-8 max-w-lg text-center text-lg text-white">
              To manage a profile, please select one from the side navigation or
              create a new one.
            </p>
            <button
              className="btn-outline btn gap-2"
              onClick={() => router.push("profiles/createProfile")}
            >
              <HiPlusCircle className="h-8 w-8" /> Create Profile
            </button>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default ProfilesPage;
