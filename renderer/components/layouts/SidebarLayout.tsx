import Head from "next/head";

import Sidebar from "../navs/Sidebar";

type Props = {
  children: React.ReactNode;
  title: string;
};

const SidebarLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="grid h-screen w-screen grid-cols-12 grid-rows-6">
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default SidebarLayout;
