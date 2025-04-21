import React from 'react';

interface QuestionAttemptProps {
    question: {
        _id: string;
        type: 'multiple-choice' | 'true-false' | 'fill-in-blank';
        text: string;
        points: number;
        options?: { text: string; isCorrect: boolean }[];
        correctAnswer?: boolean;
        correctAnswers?: string[];
        caseSensitive?: boolean;
    };
    answer: any;
    onChange: (answer: any) => void;
    showCorrect: boolean;
    isDisabled: boolean;
}

const QuestionAttempt: React.FC<QuestionAttemptProps> = ({
    question,
    answer,
    onChange,
    showCorrect,
    isDisabled
}) => {
    const isAnswerCorrect = () => {
        if (answer === null) return false;
        
        switch (question.type) {
            case 'multiple-choice':
                return question.options?.[answer]?.isCorrect || false;
            case 'true-false':
                return answer === question.correctAnswer;
            case 'fill-in-blank':
                if (question.caseSensitive) {
                    return question.correctAnswers?.includes(answer) || false;
                } else {
                    return question.correctAnswers
                        ?.map(a => a.toLowerCase())
                        .includes(answer?.toLowerCase()) || false;
                }
            default:
                return false;
        }
    };

    const renderMultipleChoice = () => {
        if (!question.options) return null;
        return (
            <div className="mt-3">
                {question.options.map((option, index) => (
                    <div key={index} className="form-check mb-2">
                        <input
                            type="radio"
                            className="form-check-input"
                            name={`question-${question._id}`}
                            checked={answer === index}
                            onChange={() => onChange(index)}
                            disabled={isDisabled}
                        />
                        <label className="form-check-label">
                            {option.text}
                            {showCorrect && (
                                <span className={option.isCorrect ? "text-success ms-2" : "text-danger ms-2"}>
                                    {option.isCorrect ? "✓" : "✗"}
                                </span>
                            )}
                        </label>
                    </div>
                ))}
            </div>
        );
    };

    const renderTrueFalse = () => {
        return (
            <div className="mt-3">
                <div className="btn-group" role="group">
                    <input
                        type="radio"
                        className="btn-check"
                        name={`question-${question._id}`}
                        id={`${question._id}-true`}
                        checked={answer === true}
                        onChange={() => onChange(true)}
                        disabled={isDisabled}
                    />
                    <label 
                        className={`btn btn-outline-primary ${
                            showCorrect && question.correctAnswer === true ? "border-success" : ""
                        }`} 
                        htmlFor={`${question._id}-true`}
                    >
                        True
                        {showCorrect && question.correctAnswer === true && (
                            <span className="text-success ms-2">✓</span>
                        )}
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name={`question-${question._id}`}
                        id={`${question._id}-false`}
                        checked={answer === false}
                        onChange={() => onChange(false)}
                        disabled={isDisabled}
                    />
                    <label 
                        className={`btn btn-outline-primary ${
                            showCorrect && question.correctAnswer === false ? "border-success" : ""
                        }`} 
                        htmlFor={`${question._id}-false`}
                    >
                        False
                        {showCorrect && question.correctAnswer === false && (
                            <span className="text-success ms-2">✓</span>
                        )}
                    </label>
                </div>
            </div>
        );
    };

    const renderFillInBlank = () => {
        return (
            <div className="mt-3">
                <input
                    type="text"
                    className="form-control"
                    value={answer || ''}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={isDisabled}
                    placeholder="Type your answer here"
                />
                {showCorrect && (
                    <div className="mt-2">
                        <strong>Correct Answers:</strong>
                        <ul className="list-unstyled">
                            {question.correctAnswers?.map((ans, index) => (
                                <li key={index} className="text-success">• {ans}</li>
                            ))}
                        </ul>
                        {question.caseSensitive && (
                            <small className="text-muted">
                                (Case sensitive)
                            </small>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderQuestion = () => {
        switch (question.type) {
            case 'multiple-choice':
                return renderMultipleChoice();
            case 'true-false':
                return renderTrueFalse();
            case 'fill-in-blank':
                return renderFillInBlank();
            default:
                return <div>Unsupported question type</div>;
        }
    };

    return (
        <div className="question-attempt">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h5 className="mb-2">{question.text}</h5>
                    <small className="text-muted">Points: {question.points}</small>
                </div>
                {showCorrect && (
                    <div className="ms-3">
                        <span className={answer === null ? "text-warning" : 
                            (isAnswerCorrect() ? "text-success" : "text-danger")}>
                            {answer === null ? "Not answered" : 
                                (isAnswerCorrect() ? "Correct" : "Incorrect")}
                        </span>
                    </div>
                )}
            </div>
            {renderQuestion()}
        </div>
    );
};

export default QuestionAttempt; 