const Dartboard = () => {
  // FILE: Dartboard_heatmap.svg <https://commons.wikimedia.org/wiki/Category:Dartboards_in_art#/media/File:Dartboard_heatmap.svg>
  // AUTHOR: Cmglee <https://commons.wikimedia.org/wiki/User:Cmglee>
  // LICENSE: CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0/>
  // CONVERTED WITH svg2jsx <https://svg2jsx.com/>

  let throws = [];
  const addThrow = (
    points: number,
    isDouble: boolean,
    isTriple: boolean,
    isBullseye: boolean
  ) => {
    console.log(points, isDouble, isTriple, isBullseye);
    if (throws.length < 3) {
      throws.push(points);
      localStorage.setItem("throws", JSON.stringify(throws.length));
    }
    calculatePoints();
  };

  const calculatePoints = () => {
    let points = 0;

    throws.map((t) => {
      points += t;
    });

    localStorage.setItem("score", JSON.stringify(points));
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-155 -155 310 310"
    >
      <defs>
        <path
          id="x1"
          stroke="white"
          d="M-6-38a38 38 0 0112 0l15-95a133 133 0 00-42 0z"
        ></path>
        <path
          id="x2"
          stroke="white"
          d="M-21-133a133 133 0 0142 0l3-19a152 152 0 00-48 0z"
        ></path>
        <path
          id="x3"
          stroke="white"
          d="M-12-76a76 76 0 0124 0l3-19a95 95 0 00-30 0z"
        ></path>
      </defs>
      <g
        strokeLinejoin="round"
        strokeWidth="0.5"
        fontFamily="Helvetica,Arial,sans-serif"
        fontSize="18"
        textAnchor="middle"
      >
        <use
          className="cursor-pointer"
          fill=""
          xlinkHref="#x1"
          onClick={() => addThrow(20, false, false, false)}
        ></use>
        <use
          className="cursor-pointer"
          fill="white"
          transform="rotate(18)"
          xlinkHref="#x1"
          onClick={() => addThrow(1, false, false, false)}
        ></use>
        <use
          className="cursor-pointer"
          fill="black"
          transform="rotate(36)"
          xlinkHref="#x1"
          onClick={() => addThrow(18, false, false, false)}
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(4, false, false, false)}
          fill="white"
          transform="rotate(54)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(13, false, false, false)}
          fill="black"
          transform="rotate(72)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(6, false, false, false)}
          fill="white"
          transform="rotate(90)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(10, false, false, false)}
          fill="black"
          transform="rotate(108)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(15, false, false, false)}
          fill="white"
          transform="rotate(126)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(2, false, false, false)}
          fill="black"
          transform="rotate(144)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(17, false, false, false)}
          fill="white"
          transform="rotate(162)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(3, false, false, false)}
          fill="black"
          transform="rotate(180)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(19, false, false, false)}
          fill="white"
          transform="rotate(198)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(7, false, false, false)}
          fill="black"
          transform="rotate(216)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(16, false, false, false)}
          fill="white"
          transform="rotate(234)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(8, false, false, false)}
          fill="black"
          transform="rotate(252)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(11, false, false, false)}
          fill="white"
          transform="rotate(270)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(14, false, false, false)}
          fill="black"
          transform="rotate(288)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(9, false, false, false)}
          fill="white"
          transform="rotate(306)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(12, false, false, false)}
          fill="black"
          transform="rotate(324)"
          xlinkHref="#x1"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(5, false, false, false)}
          fill="white"
          transform="rotate(342)"
          xlinkHref="#x1"
        ></use>
        {/* Double ring */}
        <use
          className="cursor-pointer"
          onClick={() => addThrow(40, true, false, false)}
          fill="red"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(2, true, false, false)}
          fill="green"
          transform="rotate(18)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(36, true, false, false)}
          fill="red"
          transform="rotate(36)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(8, true, false, false)}
          fill="green"
          transform="rotate(54)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(26, true, false, false)}
          fill="red"
          transform="rotate(72)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(12, true, false, false)}
          fill="green"
          transform="rotate(90)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(20, true, false, false)}
          fill="red"
          transform="rotate(108)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(30, true, false, false)}
          fill="green"
          transform="rotate(126)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(4, true, false, false)}
          fill="red"
          transform="rotate(144)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(34, true, false, false)}
          fill="green"
          transform="rotate(162)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(6, true, false, false)}
          fill="red"
          transform="rotate(180)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(38, true, false, false)}
          fill="green"
          transform="rotate(198)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(14, true, false, false)}
          fill="red"
          transform="rotate(216)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(32, true, false, false)}
          fill="green"
          transform="rotate(234)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(16, true, false, false)}
          fill="red"
          transform="rotate(252)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(22, true, false, false)}
          fill="green"
          transform="rotate(270)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(28, true, false, false)}
          fill="red"
          transform="rotate(288)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(18, true, false, false)}
          fill="green"
          transform="rotate(306)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(24, true, false, false)}
          fill="red"
          transform="rotate(324)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(10, true, false, false)}
          fill="green"
          transform="rotate(342)"
          xlinkHref="#x2"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(60, false, true, false)}
          fill="red"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(3, false, true, false)}
          fill="green"
          transform="rotate(18)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(54, false, true, false)}
          fill="red"
          transform="rotate(36)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(12, false, true, false)}
          fill="green"
          transform="rotate(54)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(39, false, true, false)}
          fill="red"
          transform="rotate(72)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(18, false, true, false)}
          fill="green"
          transform="rotate(90)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(30, false, true, false)}
          fill="red"
          transform="rotate(108)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(45, false, true, false)}
          fill="green"
          transform="rotate(126)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(6, false, true, false)}
          fill="red"
          transform="rotate(144)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(51, false, true, false)}
          fill="green"
          transform="rotate(162)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(9, false, true, false)}
          fill="red"
          transform="rotate(180)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(57, false, true, false)}
          fill="green"
          transform="rotate(198)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          onClick={() => addThrow(21, false, true, false)}
          fill="red"
          transform="rotate(216)"
          xlinkHref="#x3"
        ></use>
        <use
          className="cursor-pointer"
          fill="green"
          transform="rotate(234)"
          xlinkHref="#x3"
          onClick={() => addThrow(48, false, true, false)}
        ></use>
        <use
          className="cursor-pointer"
          fill="red"
          transform="rotate(252)"
          xlinkHref="#x3"
          onClick={() => addThrow(24, false, true, false)}
        ></use>
        <use
          className="cursor-pointer"
          fill="green"
          transform="rotate(270)"
          xlinkHref="#x3"
          onClick={() => addThrow(33, false, true, false)}
        ></use>
        <use
          className="cursor-pointer"
          fill="red"
          transform="rotate(288)"
          xlinkHref="#x3"
          onClick={() => addThrow(42, false, true, false)}
        ></use>
        <use
          className="cursor-pointer"
          fill="green"
          transform="rotate(306)"
          xlinkHref="#x3"
          onClick={() => addThrow(27, false, true, false)}
        ></use>
        <use
          className="cursor-pointer"
          fill="red"
          transform="rotate(324)"
          xlinkHref="#x3"
          onClick={() => addThrow(36, false, true, false)}
        ></use>
        {/* Bull */}
        <circle
          className="cursor-pointer"
          r="39"
          fill="green"
          stroke="white"
          onClick={() => addThrow(25, false, false, false)}
        ></circle>
        {/* Bullseye */}
        <circle
          className="cursor-pointer"
          r="19"
          fill="red"
          stroke="white"
          onClick={() => addThrow(50, false, false, true)}
        ></circle>
        <use
          className="cursor-pointer"
          fill="green"
          transform="rotate(342)"
          xlinkHref="#x3"
          onClick={() => addThrow(15, false, true, false)}
        ></use>
        <text
          className="cursor-pointer"
          x={120}
          y={150}
          fill="red"
          onClick={() => addThrow(0, false, false, false)}
        >
          Missed
        </text>
      </g>
    </svg>
  );
};

export default Dartboard;
