import Avatar from "@/components/avatars/Avatar";
import Button from "@/components/Button";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useForm, SubmitHandler } from "react-hook-form";
import { HiX } from "react-icons/hi";
import { getBase64 } from "utils/images";
import { createProfile } from "utils/profiles/create";

type Inputs = {
  avatar: FileList;
  userName: string;
};

const CreateProfile: NextPage = () => {
  const router = useRouter();
  const editor = useRef<AvatarEditor>(null);

  const [imageRef, setImageRef] = useState(undefined);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const base64 = await getBase64(editor);

    try {
      // Edit current profile
      createProfile({ name: data.userName, avatar_image: base64, uuid: "" });
      // setImageRef(undefined);
    } catch (e) {
      // TODO: Add better error handling
      console.error(e);
    } finally {
      // Reset all states and values to default
      setImageRef(undefined);
      setValue("avatar", undefined);
      setValue("userName", undefined);
      router.push("/profiles");
    }
  };

  return (
    <SidebarLayout title="Create Profile">
      <nav className="bg-base-200 p-2" role="navigation">
        <div className="breadcrumbs flex justify-between px-4 text-sm">
          <ul>
            <li>
              <Link href="/profiles">Profiles</Link>
            </li>
            <li className="font-bold">Create Profile</li>
          </ul>
          <button
            className="btn-outline btn-ghost btn-sm btn"
            onClick={() => router.push("/profiles")}
            type="button"
          >
            <HiX />
          </button>
        </div>
      </nav>
      <form
        className="card-side card-body max-w-xl p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <aside className="form-control mb-8">
          <label htmlFor="avatar" className="label">
            <span
              className={`label-text mx-auto text-4xl ${
                imageRef ? "" : "cursor-pointer"
              }`}
            >
              {imageRef ? (
                <div className="flex flex-col items-center gap-y-3">
                  <AvatarEditor
                    className="rounded-full"
                    image={imageRef}
                    ref={editor}
                    width={128}
                    height={128}
                    border={0}
                    borderRadius={100}
                    scale={1.1}
                    rotate={0}
                  />
                  <Button
                    action={() => setImageRef(undefined)}
                    size="sm"
                    color="ghost"
                  >
                    Replace Image
                  </Button>
                </div>
              ) : (
                <Avatar name="D M" size="w-32" />
              )}
            </span>
          </label>
          <input
            aria-invalid={errors.avatar ? "true" : "false"}
            accept="image/*"
            className="hidden"
            disabled={imageRef ? true : false}
            id="avatar"
            type="file"
            {...register("avatar", {
              onChange(e) {
                setImageRef(e.target.files[0]);
              },
            })}
          />
        </aside>

        <section>
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              aria-invalid={errors.userName ? "true" : "false"}
              className="input-bordered input w-full max-w-xs"
              id="name"
              placeholder="Please insert a user name..."
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
        </section>
      </form>
    </SidebarLayout>
  );
};

export default CreateProfile;
