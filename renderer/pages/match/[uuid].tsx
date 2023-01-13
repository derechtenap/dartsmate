import { useEffect, useState } from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

import Board from "../../components/board/Board";
import MainNav from "../../components/navs/MainNav";

import fs from "fs";
import os from "os";
import { useRouter } from "next/router";
import Link from "next/link";

type Player = {
  name: string;
  uuid: string;
};

const Match = () => {
  const router = useRouter();
  const [match, setMatch] = useState(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalShow, setModalShow] = useState<boolean>(true);
  const [currentPlayer, setCurrentPlayer] = useState<number>(0);
  const [points, setPoints] = useState<number[]>([]);
  const [pointsLastRound, setPointsLastRound] = useState<number[]>([]);

  useEffect(() => {
    const save = fs.readFileSync(
      `${os.homedir()}/dartmate/CURRENT_MATCH.save`,
      {
        encoding: "utf-8",
      }
    );
    const match = JSON.parse(save);

    setMatch(match);

    let points = [];
    match.players.map(() => {
      points.push(501);
      pointsLastRound.push(0);
    });
    setPoints(points);
    setIsLoading(false);

    // Show modal
    setModalShow(true);
  }, []);

  const checkThrows = () => {
    const throws = Number(localStorage.getItem("throws"));
    const players = match.players.length;
    let newPoints: number;

    console.info("THROWS FROM UUID", throws);
    if (throws === 3) {
      if (currentPlayer < players - 1) {
        setCurrentPlayer(currentPlayer + 1);
      } else {
        setCurrentPlayer(0);
      }
      localStorage.setItem("throws", JSON.stringify(0));

      if (points[currentPlayer] - Number(localStorage.getItem("score")) < 0) {
        newPoints = points[currentPlayer];
      } else {
        newPoints =
          points[currentPlayer] - Number(localStorage.getItem("score"));
      }

      const last = [...pointsLastRound];
      last[currentPlayer] = Number(localStorage.getItem("score"));

      setPointsLastRound(last);

      if (newPoints === 0) {
        alert(`${match.players[currentPlayer].name} wins!`);
        router.push("/");
        return;
      }
      const newState = [...points];
      newState[currentPlayer] = newPoints;

      setPoints(newState);
      if (players > 1) setModalShow(true);
    }
  };

  if (isLoading) return <>Loading...</>;

  if (match)
    return (
      <main
        style={{ height: "100vh", width: "100vw" }}
        onClick={() => checkThrows()}
      >
        <h1>Match {match.matchUUID}</h1>
        <Link href="/">QUIT MATCH</Link>
        <Container>
          <Row className="justify-content-center align-items-center ">
            <Col lg={5}>
              <Table>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Points Left</th>
                    <th>Points Last Round</th>
                    <th>Active Player</th>
                  </tr>
                </thead>
                {match.players.map((player: Player, idx) => (
                  <tbody key={idx}>
                    <tr>
                      <td>{player.name}</td>
                      <td>{points[idx]}</td>
                      <td>{pointsLastRound[idx]}</td>
                      <td>
                        {currentPlayer === idx ? (
                          <Badge>Throwing</Badge>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </Col>

            <Col className="d-flex flex-column justify-content-center">
              <Board />
            </Col>
          </Row>
        </Container>

        <Modal show={modalShow} fullscreen onHide={() => setModalShow(false)}>
          <Modal.Body className="display-1 d-flex flex-column justify-content-center align-items-center">
            {match.players[currentPlayer].name}, it's your turn!
            <Button
              className="mt-5"
              size="lg"
              onClick={() => setModalShow(false)}
            >
              Start Turn
            </Button>
          </Modal.Body>
        </Modal>
      </main>
    );
};

export default Match;
