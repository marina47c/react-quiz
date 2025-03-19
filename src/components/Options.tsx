import { useQuestions } from "../context/questionsContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Options({ question }: any) {
  const { dispatch, answer } = useQuestions();
  const hasAnswered = answer !== null;

  function addAnswer(index: number) {
    dispatch({ type: "newAnswer", payload: index });
  }

  return (
    <div className="options">
      {question.options.map((option: string, index: number) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => addAnswer(index)}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
