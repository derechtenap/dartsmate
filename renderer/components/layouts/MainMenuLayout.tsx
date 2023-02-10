import Head from "next/head";

type Props = {
  children: React.ReactNode;
  title: string;
};

const DefaultLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="grid h-screen w-screen grid-cols-12 grid-rows-6">
        {children}
      </main>
    </>
  );
};

export default DefaultLayout;
