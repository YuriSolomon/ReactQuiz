import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

export default function Question({
    questionText,
    answers,
    onSelectAnswer,
    selectedAnswer,
    answerState,
    onSkipAnswer
}) {

    return (
        <div id="question">
            <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
            <div id="question">
                <h2>{questionText}</h2>
                <Answers
                    answers={answers}
                    selectedAnswer={selectedAnswer}
                    answerState={answerState}
                    onSelect={onSelectAnswer}
                />
            </div>
        </div>
    )
}