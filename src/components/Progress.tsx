import { useQuestions } from "../context/questionsContext";

function Progress() {
  const { index, questions, points, answer, maxNumberOfPoints } =
    useQuestions();
  const questionsNum = questions.length;

  return (
    <header className="progress">
      <progress max={questionsNum} value={index + Number(answer != null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsNum}
      </p>
      <p>
        Points {points} / {maxNumberOfPoints}
      </p>
    </header>
  );
}

export default Progress;
