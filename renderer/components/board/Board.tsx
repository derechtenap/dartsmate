import React from "react";

import Button from "react-bootstrap/Button";

const Board = () => {
  /*
   * ORIGINAL FILE: Dartboard_heatmap.svg <https://commons.wikimedia.org/wiki/Category:Dartboards_in_art#/media/File:Dartboard_heatmap.svg>
   * AUTHOR: Cmglee <https://commons.wikimedia.org/wiki/User:Cmglee>
   * LICENSE: CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0/>
   * CONVERTED WITH svg2jsx <https://svg2jsx.com/>
   * MODIFIED BY: derechtenap <https://github.com/derechtenap/>
   */

  // TODO: The values should be adjustable via the settings
  const colors = {
    black: "var(--bs-black)",
    green: "var(--bs-success)",
    red: "var(--bs-danger)",
    stroke: "var(--bs-white)",
    white: "var(--bs-white)",
  };

  const paths = ["x1", "x2", "x3"];

  const numbers = [
    20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
  ];

  const circles = {
    outerBullseye: {
      radius: 39,
      fill: colors.green,
      score: 25,
      stroke: colors.white,
    },
    bullseye: {
      radius: 19,
      fill: colors.red,
      score: 50,
      stroke: colors.white,
    },
  };

  const setFillColor = (path: string, idx: number) => {
    switch (path) {
      case "#x1":
        return idx % 2 == 0 ? colors.black : colors.white;
      case "#x2":
      case "#x3":
        return idx % 2 == 0 ? colors.red : colors.green;
      default:
        throw new Error(`Color for path "${path}" cannot be set!`);
    }
  };

  return (
    <>
      <svg
        viewBox="-155 -155 310 310"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            id="x1"
            stroke={colors.stroke}
            d="M-6-38a38 38 0 0112 0l15-95a133 133 0 00-42 0z"
          ></path>
          <path
            id="x2"
            stroke={colors.stroke}
            d="M-21-133a133 133 0 0142 0l3-19a152 152 0 00-48 0z"
          ></path>
          <path
            id="x3"
            stroke={colors.stroke}
            d="M-12-76a76 76 0 0124 0l3-19a95 95 0 00-30 0z"
          ></path>
        </defs>
        <g
          fontFamily="var(--bs-font-sans-serif)"
          fontSize="var(--bs-body-font-size)"
          strokeLinejoin="round"
          strokeWidth="0.5"
        >
          {paths.map((path, i) => (
            <React.Fragment key={i}>
              {numbers.map((number, idx) => (
                <use
                  className="cursor-pointer"
                  data-score={number * (i + 1)}
                  key={idx}
                  fill={setFillColor(`#${path}`, idx)}
                  transform={`rotate(${idx * 18})`}
                  onClick={() => console.info(number * (i + 1))}
                  xlinkHref={`#${path}`}
                />
              ))}
            </React.Fragment>
          ))}
          <circle
            className="cursor-pointer"
            fill={circles.outerBullseye.fill}
            stroke={circles.outerBullseye.stroke}
            r={circles.outerBullseye.radius}
            onClick={() => console.info(circles.outerBullseye.score)}
          />
          <circle
            className="cursor-pointer"
            fill={circles.bullseye.fill}
            stroke={circles.bullseye.stroke}
            r={circles.bullseye.radius}
            onClick={() => console.info(circles.bullseye.score)}
          />
        </g>
      </svg>
      <Button
        className="mt-3"
        data-score={0}
        onClick={() => console.info(0)}
        variant="danger"
      >
        Missed
      </Button>
    </>
  );
};

export default Board;
