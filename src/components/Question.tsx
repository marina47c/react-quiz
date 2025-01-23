import Options from "./Options";
import { QuestionType } from "../types";

type QuestionProps = {
  question: QuestionType;
  answer: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: any;
};

export default function Question(props: QuestionProps) {
  const { question, dispatch, answer } = props;
  
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
