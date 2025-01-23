type FinishScreenProps = {
  points: number;
  maxNumberOfPoints: number;
};

function FinishScreen(props: FinishScreenProps) {
  const { points, maxNumberOfPoints } = props;
  const percentage = (points / maxNumberOfPoints) * 100;

  return (
    <p>
      You scored <strong>{points}</strong> out of {maxNumberOfPoints}
    </p>
  );
}

export default FinishScreen;
