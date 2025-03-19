import Options from "./Options";
import { useQuestions } from "../context/questionsContext";

export default function Question() {
  const { questions, index } = useQuestions();
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
