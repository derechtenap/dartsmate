import { NextPage } from "next";
import SideNavigation from "../components/SideNavigation";

const menuPage: NextPage = () => {
  return (
    <main className="grid grid-cols-6 gap-4 w-screen h-screen">
      <aside className="col-span-1 bg-gray-800">
        <SideNavigation />
      </aside>
      <section className="col-span-5 flex justify-center items-center h-full text-gray-800">
        <p className="text-6xl italic">DartMate</p>
      </section>
    </main>
  );
};

export default menuPage;
