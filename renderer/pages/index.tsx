import { useEffect, useState } from "react";

import { NextPage } from "next";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Offcanvas from "react-bootstrap/Offcanvas";

import {
  BsDoorOpenFill,
  BsGearFill,
  BsLifePreserver,
  BsMoonFill,
  BsSunFill,
} from "react-icons/bs";

import {
  getStoredTheme,
  setStoredTheme,
  updateDataAttribute,
} from "../utils/ts/appTheme";

const Index: NextPage = () => {
  const version = require("../../package.json").version;

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
        as="main"
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        <h1 className="mb-5">DartMate</h1>
        <Row className="g-5">
          <Col className="text-center d-flex flex-column justify-content-center align-items-center">
            <Card className="border-0">
              <Card.Body>
                <Button className="rounded-4 p-3" variant="primary">
                  <BsLifePreserver className="display-1" />
                </Button>
              </Card.Body>
            </Card>
            <p className="fs-5 mt-2">New Game</p>
          </Col>

          <Col className="text-center d-flex flex-column justify-content-center align-items-center">
            <Card className="border-0 rounded-4">
              <Card.Body>
                <Button
                  className="rounded-4 p-3"
                  variant="secondary"
                  onClick={() => setShow(true)}
                >
                  <BsGearFill className="display-1" />
                </Button>
              </Card.Body>
            </Card>
            <p className="fs-5 mt-2">Settings</p>
          </Col>
          <Col className="text-center d-flex flex-column justify-content-center align-items-center">
            <Card className="border-0">
              <Card.Body>
                <Button className="rounded-4 p-3" variant="light">
                  <BsDoorOpenFill className="display-1 text-dark" />
                </Button>
              </Card.Body>
            </Card>
            <p className="fs-5 mt-2">Quit App</p>
          </Col>
        </Row>
        <p className="mt-5">
          <code>v{version}</code>
        </p>
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

export default Index;
