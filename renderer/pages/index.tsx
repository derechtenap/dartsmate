import { NextPage } from "next";

import Layout from "@/components/layouts/MainMenuLayout";
import List from "@/components/navs/optionsMenu/List";
import Nav from "@/components/navs/mainMenu/Nav";

import app from "../../package.json";

const IndexPage: NextPage = () => {
  return (
    <Layout title="DartMate">
      <Nav />
      <section className="col-start-10 col-end-13 row-start-1 row-end-3 m-4 flex flex-col items-end">
        <h1 className="mb-4 text-3xl opacity-75">DartMate {app.version}</h1>
        <List />
      </section>
    </Layout>
  );
};

export default IndexPage;
