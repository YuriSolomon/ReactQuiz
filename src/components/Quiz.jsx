import { useCallback, useState } from "react";

import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) { //use callback to run the function once for depandancy of handleSkipAnswer. depandancy is not needed.
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]); //creates a callback to prevent useEffect depandancy from being called on function. add handleSelectAnswer as a depandancy because it is affected by props and might run on props change

    if (quizIsComplete) {
        return <Summary userAnswers={userAnswers} />
    }

    // key was added to QuestionTimer. this will unmount and remount the component on key change.
    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}