import Game from "./components/game";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorComponent from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import { useQuestions } from "./context/questionsContext";

function App() {
  const { status } = useQuestions();

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
              <Question />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}
          {status === "finished" && <FinishScreen />}
        </div>
      </Game>
    </div>
  );
}

export default App;
