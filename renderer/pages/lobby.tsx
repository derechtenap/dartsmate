import { randomUUID } from "crypto";
import { useRouter } from "next/router";
import React, { useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";

import MainNav from "../components/navs/MainNav";

const Lobby = () => {
  const router = useRouter();
  const os = require("os");
  const fs = require("fs");
  const homedir = os.homedir();
  const [error, setError] = useState<string | undefined>(undefined);
  const [playerCount, setPlayerCount] = useState<number>(1);
  const [playerList, setPlayerList] = useState<
    { name: string | undefined; uuid: string }[]
  >([{ name: undefined, uuid: randomUUID() }]);

  const removePlayer = (idx: number) => {
    setPlayerList(playerList.filter((player, id) => id !== idx));
    setPlayerCount(playerCount - 1);
  };

  const updatePlayerList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    console.log(randomUUID());

    setPlayerCount(parseInt(e.target.value));

    if (value > playerCount) {
      setPlayerList([...playerList, { name: undefined, uuid: randomUUID() }]);
    }

    if (value < playerCount) {
      const newPlayerList = playerList.slice(0, -1);

      setPlayerList(newPlayerList);
      console.log(playerList);
    }
  };

  const updatePlayerName = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newPlayerList = [...playerList];
    if (e.target.value === "") {
      newPlayerList[idx].name = undefined;
    } else {
      newPlayerList[idx].name = e.target.value;
    }

    setPlayerList(newPlayerList);
  };

  const checkIfPlayerNamesAreSet = () => {
    playerList.map((player, idx) => {
      if (player.name === undefined) {
        player.name = `Player ${idx + 1}`;
      }
    });

    // Write savefile
    const matchUUID = randomUUID();

    if (fs.existsSync(`${homedir}/dartmate/`)) {
      fs.writeFileSync(
        `${homedir}/dartmate/CURRENT_MATCH.save`,
        JSON.stringify({
          matchUUID: matchUUID,
          players: playerList,
          settings: {
            score: 501,
            legs: 1,
            sets: 1,
          },
        }),
        {
          encoding: "utf-8",
        }
      );
    } else {
      fs.mkdirSync(`${homedir}/dartmate/`);
      fs.writeFileSync(
        `${homedir}/dartmate/CURRENT_MATCH.save`,
        JSON.stringify({
          matchUUID: matchUUID,
          players: playerList,
          settings: {
            score: 501,
            legs: 1,
            sets: 1,
          },
        }),
        {
          encoding: "utf-8",
        }
      );
    }
    router.push(`/match/${matchUUID}`);
  };

  return (
    <>
      <MainNav />
      <Container fluid>
        <h1 className="my-3">Lobby</h1>
        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setError(undefined)}
          >
            {error}
          </Alert>
        )}
        <Row as="section">
          <Col as="main" md={8}>
            <Stack>
              <Form className="">
                {playerList.map((player, idx) => (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    key={player.uuid}
                  >
                    <Form.Group
                      className="flex-grow-1 mb-2"
                      controlId="formBasicEmail"
                    >
                      <Form.Control
                        type="text"
                        placeholder={`Please enter a name for Player ${
                          idx + 1
                        }`}
                        value={playerList[idx].name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updatePlayerName(idx, e)
                        }
                      />
                    </Form.Group>
                    {playerList.length > 1 ? (
                      <CloseButton
                        className="ms-3"
                        onClick={() => removePlayer(idx)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </Form>
            </Stack>
          </Col>
          <Col as="aside">
            <Card className="bg-body-tertiary">
              <Card.Body>
                <Card.Title>Settings</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Players</Form.Label>

                    <Form.Control
                      type="number"
                      value={playerCount}
                      min={1}
                      max={8}
                      onKeyDown={(e) => e.preventDefault()}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updatePlayerList(e)
                      }
                    />
                    <Form.Label className="mt-3">Score</Form.Label>

                    <Form.Control
                      type="number"
                      value={501}
                      min={1}
                      max={10000}
                      onChange={() => console.info("Changed score")}
                    />
                    <Form.Label className="mt-3">Legs</Form.Label>

                    <Form.Control
                      type="number"
                      value={1}
                      min={1}
                      max={10000}
                      onChange={() => console.info("Changed score")}
                    />
                    <Form.Label className="mt-3">Sets</Form.Label>

                    <Form.Control
                      type="number"
                      value={1}
                      min={1}
                      max={10000}
                      onChange={() => console.info("Changed score")}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
            <Button
              className="mt-3"
              onClick={() => checkIfPlayerNamesAreSet()}
              variant="primary"
            >
              Start
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Lobby;
