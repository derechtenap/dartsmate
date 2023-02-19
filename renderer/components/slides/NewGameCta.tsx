import SlideContainer from "./utils/SlideContainer";

const NewGameCta = () => {
  return (
    <SlideContainer>
      <h1 className="mb-4 text-6xl font-bold text-white">Setup A New Game</h1>
      <p className="mb-8 text-2xl">
        Create and customize a new game with DartMate.
      </p>

      <button className="btn-primary btn text-white">
        Start a new game...
      </button>
    </SlideContainer>
  );
};

export default NewGameCta;
