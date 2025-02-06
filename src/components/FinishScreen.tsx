type FinishScreenProps = {
  points: number;
  maxNumberOfPoints: number;
  highscore: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any;
};

function FinishScreen(props: FinishScreenProps) {
  const { points, maxNumberOfPoints, highscore, dispatch } = props;
  const percentage = (points / maxNumberOfPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🐞";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🙈";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxNumberOfPoints}
        <div>{Math.ceil(percentage)}%</div>
      </p>
      <p className="highscore">(Hightscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
