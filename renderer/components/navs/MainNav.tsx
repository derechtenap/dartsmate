import { useEffect, useState } from "react";

import Link from "next/link";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";

import { BsGear, BsMoonFill, BsPersonCircle, BsSunFill } from "react-icons/bs";
import {
  getStoredTheme,
  setStoredTheme,
  updateDataAttribute,
} from "../../utils/ts/appTheme";

const MainNav = () => {
  const [show, setShow] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("");

  const updateTheme = (theme: string) => {
    setTheme(theme);
    setStoredTheme(theme); // Write theme to `localStorage`
    updateDataAttribute(theme);
  };

  useEffect(() => {
    const currentTheme = getStoredTheme();
    setTheme(currentTheme);
    updateDataAttribute(currentTheme);
  }, []);

  return (
    <>
      <Container
        as="nav"
        className="d-flex justify-content-between bg-body-tertiary py-2"
        fluid
      >
        <Nav as="ul">
          <Nav.Item as="li">
            <Link href="/">DartMate</Link>
          </Nav.Item>
        </Nav>
        <Nav as="ul">
          <Nav.Item as="li">
            <Button
              className="m-0 p-0 d-flex align-items-center"
              variant="link"
            >
              <BsGear className="fs-4" onClick={() => setShow(true)} />
            </Button>
          </Nav.Item>
        </Nav>
      </Container>

      <Offcanvas show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="fs-5">Dark mode</p>
          <p>
            You can change the current used color mode by clicking on the icons
            below.
          </p>
          <ButtonGroup>
            <Button
              className="d-flex align-items-center"
              onClick={() => updateTheme("light")}
              variant={theme === "light" ? "primary" : "outline-primary"}
            >
              <BsSunFill className="fs-5" />
            </Button>
            <Button
              className="d-flex align-items-center"
              onClick={() => updateTheme("dark")}
              variant={theme === "dark" ? "primary" : "outline-primary"}
            >
              <BsMoonFill className="fs-5" />
            </Button>
          </ButtonGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MainNav;
