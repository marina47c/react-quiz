import { useQuestions } from "../context/questionsContext";

export default function NextButton() {
  const { questions, answer, index, dispatch } = useQuestions();
  const numberOfQuestions: number = questions?.length || 0;

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finishQuiz() {
    dispatch({ type: "finish" });
  }

  if (answer === null) return null;

  if (index < numberOfQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={nextQuestion}>
        Next
      </button>
    );
  }

  if (index === numberOfQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={finishQuiz}>
        Finish
      </button>
    );
  }
}
