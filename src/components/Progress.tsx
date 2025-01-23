type PropgressProps = {
  index: number;
  questionsNum: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
};

function Progress(props: PropgressProps) {
  const { index, questionsNum, points, maxPossiblePoints, answer } = props;

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
