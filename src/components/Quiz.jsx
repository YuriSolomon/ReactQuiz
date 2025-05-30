import { useCallback, useState } from "react";

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) { //use callback to run the function once for depandancy of handleSkipAnswer. depandancy is not needed.
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct');
            } else {
                setAnswerState('wrong');
            }

            setTimeout(() => {
                setAnswerState('');
            }, 2000)
        }, 1000);

    }, [activeQuestionIndex]); // recreate the method every time the answer index changes.

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]); //creates a callback to prevent useEffect depandancy from being called on function. add handleSelectAnswer as a depandancy because it is affected by props and might run on props change

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    const shuffeledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffeledAnswers.sort(() => Math.random() - 0.5); //Math.random() gives a value between 0 and 1, reducing 0.5 will give a 50% chance for a negative number

    // key was added to QuestionTimer. this will unmount and remount the component on key change.
    return (
        <div id="quiz">
            <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={() => handleSelectAnswer(null)} />
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffeledAnswers.map(answer => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = '';

                        if (answerState === 'answered' && isSelected) {
                            cssClass = 'selected'
                        }

                        if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                            cssClass = answerState;
                        }

                        return (
                            <li className="answer" key={answer}>
                                <button className={cssClass} onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}