import Head from "next/head";
import OptionsList from "../navs/optionsMenu/OptionsList";

type Props = {
  children: React.ReactNode;
  title: string;
};

const DefaultLayout = ({ children, title }: Props) => {
  const appVersion: string = require("../../../package.json").version;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex h-screen w-screen">
        <aside className="h-full w-16 flex-none bg-base-300 text-white">
          <p className="absolute bottom-16 w-16 -rotate-90 transform whitespace-nowrap opacity-80">
            DartMate &mdash; {appVersion}
          </p>
          <OptionsList />
        </aside>
        <section className="h-full w-full">{children}</section>
      </main>
    </>
  );
};

export default DefaultLayout;
