import Head from "next/head";

import Sidebar from "../navs/Sidebar";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const SidebarLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} - DartMate` : "DartMate"}</title>
      </Head>
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </>
  );
};

export default SidebarLayout;
