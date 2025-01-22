type StartScreenProps = {
  numberOfQuestions: number;
  dispatch?: React.Dispatch<{ type: string }>;
};

export default function StartScreen(props: StartScreenProps) {
  const { numberOfQuestions, dispatch } = props;

  const startGame = () => dispatch?.({ type: "start" });

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numberOfQuestions} questions to test your react mastery.</h3>
      <button className="btn btn-ui" onClick={startGame}>
        Let's start
      </button>
    </div>
  );
}
