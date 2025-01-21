import { useEffect, useReducer } from "react";
import Game from "./game";
import Header from "./Header";
import Loader from "./Loader";
import ErrorComponent from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import { QuestionType } from "./types";

type State = {
  questions: QuestionType[];
  //loading, error, ready, active, finished
  status: string;
  index: number;
};

type Action = {
  type: string;
  payload?: QuestionType[];
};

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
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
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index } = state;

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
          {status === "active" && <Question question={questions[index]} />}
        </div>
      </Game>
    </div>
  );
}

export default App;
