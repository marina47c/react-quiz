import { ReactNode } from "react";
import { QuestionType } from "../types";

export interface IQuizContext {
  questions: QuestionType[];
  //loading, error, ready, active, finished
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
  maxNumberOfPoints: number;
  numberOfQuestions: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (action: { type: string; payload?: any }) => void;
}

export interface IQuestionsProvider {
  children?: ReactNode;
}

export interface IState {
  questions: QuestionType[];
  //loading, error, ready, active, finished
  status: string;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

export interface IAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}
