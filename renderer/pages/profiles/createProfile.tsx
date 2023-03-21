import SidebarLayout from "@/components/layouts/SidebarLayout";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiX } from "react-icons/hi";

const CreateProfile: NextPage = () => {
  const router = useRouter();

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
    </SidebarLayout>
  );
};

export default CreateProfile;
