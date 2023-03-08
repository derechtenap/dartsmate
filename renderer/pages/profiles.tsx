import { NextPage } from "next";
import { useEffect, useState } from "react";

import SidebarLayout from "@/components/layouts/SidebarLayout";

import { loadProfile, readProfileDir } from "utils/profiles/load";
import Link from "next/link";
import Avatar from "@/components/avatars/Avatar";
import { HiPencil, HiTrash, HiUserCircle, HiUsers, HiX } from "react-icons/hi";
import { profileFileExtension } from "utils/profiles/profileFolderHandling";
import { deleteProfile } from "utils/profiles/delete";
import { useForm, SubmitHandler } from "react-hook-form";
import { createProfile } from "utils/profiles/create";
import Button from "@/components/Button";

type Inputs = {
  avatar: FileList;
  userName: string;
};

const ProfilesPage: NextPage = () => {
  const [profiles, setProfiles] = useState<ProfileFile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<ProfileFile>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createProfile({
      name: data.userName,
      avatar_image: data.avatar,
      uuid: "",
    }).then(() => {
      getProfiles().then(() => {
        setIsOpen(false);
      });
    });
  };

  const getProfiles = async () => {
    setProfiles([]);
    const profileList = await readProfileDir();
    profileList.forEach(async (p) => {
      const profile = await loadProfile(p);
      setProfiles((prev) => [...prev, profile]);
    });
  };

  const openProfile = async (uuid: string) => {
    const currentProfile = await loadProfile(`${uuid}${profileFileExtension}`);
    setCurrentProfile(currentProfile);
  };

  const handleDelete = (uuid: string) => {
    deleteProfile(uuid)
      .then(() => {
        setCurrentProfile(undefined);
      })
      .then(() => {
        getProfiles();
      });
  };

  useEffect(() => {
    getProfiles().then(() => {
      setIsLoading(false);
    });
  }, []);

  const actionButtons = [
    {
      color: "info",
      icon: <HiPencil />,
      name: "Edit",
    },
    {
      action: () => setCurrentProfile(undefined),
      icon: <HiX />,
      name: "Close",
    },
    {
      action: () => handleDelete(currentProfile.uuid),
      color: "error",
      icon: <HiTrash />,
      name: "Delete",
    },
  ];

  const EmptyState = () => {
    return (
      <main className="flex h-full w-full flex-1 items-center justify-center">
        <div className="bg-diagonal-lines w-3/4 max-w-2xl rounded-lg px-4 py-8 text-center">
          <HiUsers className="mx-auto mb-8 text-7xl" />
          <h1 className="text-xl">
            Please select a profile from the sidebar or create a new profile.
          </h1>
        </div>
      </main>
    );
  };

  if (!isLoading) {
    return (
      <main className="flex h-full w-full items-center justify-center">
        <div className="radial-progress animate-spin">
          <span className="sr-only">Loading..</span>
        </div>
      </main>
    );
  }

  return (
    <>
      {isOpen ? (
        <form
          className="flex h-screen w-screen flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-control">
            <label htmlFor="avatar" className="label">
              <span className="label-text">Avatar</span>
            </label>
            <input
              aria-invalid={errors.avatar ? "true" : "false"}
              autoFocus
              className="file-input input-bordered w-full max-w-xs"
              id="avatar"
              type="file"
              {...register("avatar", {})}
            />
          </div>
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              aria-invalid={errors.userName ? "true" : "false"}
              className="input-bordered input w-full max-w-xs"
              id="name"
              placeholder="Name"
              type="text"
              {...register("userName", {
                required: {
                  message: "This field is required!",
                  value: true,
                },
                minLength: {
                  message: "The name must heave at least 2 characters",
                  value: 2,
                },
                maxLength: {
                  message: "Max 16 characters",
                  value: 16,
                },
              })}
            />
            <label htmlFor="name" className="label">
              {errors.userName && (
                <span className="label-text text-error">
                  {errors.userName.message}
                </span>
              )}
            </label>
          </div>
          <input className="btn mt-6" type="submit" />
          <button
            className="btn-ghost btn"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            close
          </button>
        </form>
      ) : (
        <SidebarLayout title="Profiles">
          <div className="flex h-full">
            <aside className="h-full w-64 overflow-y-auto bg-base-200">
              <ul className="menu">
                <li className="bg-primary font-semibold">
                  <Link href="#">
                    <span
                      className="flex items-center"
                      onClick={() => setIsOpen(true)}
                    >
                      <HiUserCircle className="h-8 w-8" />
                      Create a new Profile
                    </span>
                  </Link>
                </li>
                {profiles.map(({ avatar_image, name, uuid }) => (
                  <li
                    className={`${
                      currentProfile?.uuid === uuid
                        ? "bg-base-100"
                        : "bg-transparent"
                    }`}
                    key={uuid}
                  >
                    <Link href="#">
                      <span
                        className="flex min-w-0"
                        onClick={() => openProfile(uuid)}
                      >
                        <Avatar imgSrc={avatar_image as string} name={name} />
                        {name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
            {!currentProfile ? (
              <EmptyState />
            ) : (
              <main className="flex-1">
                <header className="bg-diagonal-lines flex items-center gap-x-16 rounded-lg p-4">
                  <Avatar
                    imgSrc={currentProfile.avatar_image as string}
                    name={currentProfile.name}
                    size="w-32"
                  />
                  <h1 className="font-bold">
                    {currentProfile.name}
                    <small className="mt-4 block text-base font-normal">
                      Created at:{" "}
                      {new Date(currentProfile.created_at).toLocaleDateString()}
                    </small>
                  </h1>
                </header>
                <ul className="navbar gap-x-4 bg-base-200 xl:justify-end">
                  {actionButtons.map(({ action, color, icon, name }) => (
                    <li key={name}>
                      <Button
                        action={action}
                        color={color}
                        size="sm"
                        outline={true}
                      >
                        {icon} <span className="ml-2">{name}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
                <section className="p-2">
                  <h2>Statistics</h2>
                  <div className="stats">
                    {Object.entries(currentProfile.stats).map(
                      ([stat, value]) => (
                        <div className="stat" key={stat}>
                          <div className="stat-title capitalize">
                            {stat.replace("_", " ")}
                          </div>
                          <div className="stat-value">{value}</div>
                        </div>
                      )
                    )}
                  </div>
                </section>
              </main>
            )}
          </div>
        </SidebarLayout>
      )}
    </>
  );
};

export default ProfilesPage;
