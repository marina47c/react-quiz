import { QuestionType } from "./types";

type QuestionProps = {
  question: QuestionType;
};

export default function Question(props: QuestionProps) {
  const { question } = props;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option: string) => (
          <button className="btn btn-option" key={option}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
