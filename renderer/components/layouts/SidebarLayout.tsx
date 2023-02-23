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
      <main className="flex h-screen w-screen">
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default SidebarLayout;
