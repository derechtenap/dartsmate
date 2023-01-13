import Head from "next/head";

import Container from "react-bootstrap/Container";

type Props = {
  children: React.ReactNode;
  title: string;
};

const DefaultCentered = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container
        as="main"
        className="fullscreen d-flex justify-content-center align-items-center"
        fluid="xxl"
      >
        <h1 className="position-absolute start-0 top-0 m-4">{title}</h1>
        {children}
      </Container>
    </>
  );
};

export default DefaultCentered;
