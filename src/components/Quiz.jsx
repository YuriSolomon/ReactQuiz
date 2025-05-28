import { useCallback, useState } from "react";

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer =  useCallback(function handleSelectAnswer(selectedAnswer) { //use callback to run the function once for depandancy of handleSkipAnswer. depandancy is not needed.
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]); //creates a callback to prevent useEffect depandancy from being called on function. add handleSelectAnswer as a depandancy because it is affected by props and might run on props change

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }
    
    const shuffeledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffeledAnswers.sort(() => Math.random() - 0.5); //Math.random() gives a value between 0 and 1, reducing 0.5 will give a 50% chance for a negative number

    return (
        <div id="quiz">
            <QuestionTimer timeout={10000} onTimeout={() => handleSelectAnswer(null)} />
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffeledAnswers.map(answer => (
                        <li className="answer" key={answer}>
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}