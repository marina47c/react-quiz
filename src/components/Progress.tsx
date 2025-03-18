import { useQuestions } from "../context/questionsContext";
import { QuestionType } from "../types";

function Progress() {
  const { index, questions, points, answer } = useQuestions();
  const questionsNum = questions.length;
  const maxPossiblePoints: number = questions.reduce(
    (prev: number, cur: QuestionType) => prev + cur.points,
    0
  );

  return (
    <header className="progress">
      <progress max={questionsNum} value={index + Number(answer != null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsNum}
      </p>
      <p>
        Points {points} / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
