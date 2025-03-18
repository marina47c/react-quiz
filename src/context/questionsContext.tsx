import { createContext, useContext, useEffect, useReducer } from "react";
import {
  IAction,
  ICityContext,
  IQuestionsProvider,
  IState,
} from "./interfaces";

const SECS_PER_QUESTION = 30;

const initialState: IState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: IState, action: IAction) {
  const { type, payload } = action;

  switch (type) {
    case "dataReceived":
      return { ...state, questions: payload || [], status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
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
      return { ...state, index: newIndex, answer: null };
    }
    case "finish": {
      const newHighscore: number =
        state.points > state.highscore ? state.points : state.highscore;
      return { ...state, status: "finished", highscore: newHighscore };
    }
    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        status: "active",
        highscore: state.highscore,
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining
          ? state.secondsRemaining - 1
          : 0,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }

    default:
      throw new Error("Action unknown");
  }
}

const QuestionsContext = createContext<ICityContext>({
  questions: [],
  status: "",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  dispatch: () => {},
});

function QuestionsProvider({ children }: IQuestionsProvider) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

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
    <QuestionsContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionsContext);

  if (!context) {
    throw new Error("useQuestions must be used within a CitiesProvider");
  }

  return context;
}

export { QuestionsProvider, useQuestions };
