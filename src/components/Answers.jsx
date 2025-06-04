import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {

    const shuffeledAnswers = useRef();

    if (!shuffeledAnswers.current) {
        shuffeledAnswers.current = [...answers];
        shuffeledAnswers.current.sort(() => Math.random() - 0.5); //Math.random() gives a value between 0 and 1, reducing 0.5 will give a 50% chance for a negative number
    }

    return (
        <ul id="answers">
            {shuffeledAnswers.current.map(answer => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if (answerState === 'answered' && isSelected) {
                    cssClass = 'selected'
                }

                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    cssClass = answerState;
                }

                return (
                    <li className="answer" key={answer}>
                        <button className={cssClass} onClick={() => onSelect(answer)}>{answer}</button>
                    </li>
                )
            })}
        </ul>
    )
}