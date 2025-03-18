import Game from "./components/game";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import { QuestionType } from "./types";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import { useQuestions } from "./context/questionsContext";

function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    dispatch,
  } = useQuestions();
  const maxPossiblePoints: number = questions.reduce(
    (prev: number, cur: QuestionType) => prev + cur.points,
    0
  );

  return (
    <div className="app">
      <Header />
      <Game>
        <div>
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorComponent />}
          {status === "ready" && <StartScreen />}
          {status === "active" && (
            <>
              <Progress />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                <NextButton />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              points={points}
              maxNumberOfPoints={maxPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </div>
      </Game>
    </div>
  );
}

export default App;
