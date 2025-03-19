import { useQuestions } from "../context/questionsContext";

function FinishScreen() {
  const { points, highscore, maxNumberOfPoints, dispatch } = useQuestions();

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
