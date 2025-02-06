type NextButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any;
  answer: number | null;
  index: number;
  numOfQuestions: number;
};

export default function NextButton(props: NextButtonProps) {
  const { dispatch, answer, index, numOfQuestions } = props;

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finishQuiz() {
    dispatch({ type: "finish" });
  }

  if (answer === null) return null;

  if (index < numOfQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={nextQuestion}>
        Next
      </button>
    );
  }

  if (index === numOfQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={finishQuiz}>
        Finish
      </button>
    );
  }
}
