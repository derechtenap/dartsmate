import { useEffect, useState } from "react";

import { NextPage } from "next";
import Link from "next/link";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";

import {
  BsDoorOpenFill,
  BsGearFill,
  BsMoonFill,
  BsPlusCircleDotted,
  BsSunFill,
} from "react-icons/bs";

import {
  getStoredTheme,
  setStoredTheme,
  updateDataAttribute,
} from "../utils/ts/appTheme";

import Layout from "../components/layouts/DefaultCentered";

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
const indexPage: NextPage = () => {
  return (
    <Layout title="DartMate Alpha">
      <Stack className="text-center" direction="horizontal" gap={5}>
        <Card className="border-0">
          <Card.Body>
            <Link href="/lobby">
              <Button className="rounded-4 p-3" variant="primary">
                <BsPlusCircleDotted className="display-1" />
              </Button>
            </Link>
          </Card.Body>
          <p className="fs-5 mt-2">New Match</p>
        </Card>

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
          <p className="fs-5 mt-2">Settings</p>
        </Card>

        <Card className="border-0">
          <Card.Body>
            <Button className="rounded-4 p-3" variant="light">
              <BsDoorOpenFill className="display-1 text-dark" />
            </Button>
          </Card.Body>
          <p className="fs-5 mt-2">Quit App</p>
        </Card>
      </Stack>

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
    </Layout>
  );
};

export default indexPage;
