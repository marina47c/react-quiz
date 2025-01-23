type NextButtonProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any;
  answer: number | null;
};

export default function NextButton(props: NextButtonProps) {
  const { dispatch, answer } = props;

  if (answer === null) return null;

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  return (
    <button className="btn btn-ui" onClick={nextQuestion}>
      Next
    </button>
  );
}
