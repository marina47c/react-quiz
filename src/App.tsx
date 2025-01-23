import { useEffect, useReducer } from "react";
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

type State = {
  questions: QuestionType[];
  //loading, error, ready, active, finished
  status: string;
  index: number;
  answer: number | null;
  points: number;
};

type Action = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
};

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state: State, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload || [], status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions[state.index];
      const points =
        payload === question.correctOption
          ? state.points + question.points
          : state.points;

      return { ...state, answer: payload, points: points };
    }
    case "nextQuestion": {
      const newIndex = state.index + 1;
      const muxNumberOfQuestions: number = state.questions.length;
      const isFinished: boolean = muxNumberOfQuestions === state.index + 1;

      if (isFinished)
        return { ...state, status: "finished", index: 0, answer: null };
      else {
        return { ...state, index: newIndex, answer: null };
      }
    }

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points } = state;
  const questionNum: number = questions.length;
  const maxPossiblePoints: number = questions.reduce(
    (prev: number, cur: QuestionType) => prev + cur.points,
    0
  );

  const numberOfQuestions: number = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch(() => {
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Game>
        <div>
          {status === "loading" && <Loader />}
          {status === "error" && <ErrorComponent />}
          {status === "ready" && (
            <StartScreen
              numberOfQuestions={numberOfQuestions}
              dispatch={dispatch}
            />
          )}
          {status === "active" && (
            <>
              <Progress
                index={index}
                questionsNum={questionNum}
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                answer={answer}
              />
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton dispatch={dispatch} answer={answer} />
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              points={points}
              maxNumberOfPoints={maxPossiblePoints}
            />
          )}
        </div>
      </Game>
    </div>
  );
}

export default App;
