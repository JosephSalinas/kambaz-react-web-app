import React, { useState, useEffect } from 'react';

// setup typing interfaces
interface TrueFalseQuestion {
    _id?: string;
    type: 'true-false';
    text: string;
    points: number;
    correctAnswer: boolean;
    orderIndex?: number;
}

interface TrueFalseEditorProps {
    question: TrueFalseQuestion;
    onChange: (question: TrueFalseQuestion) => void;
    onDelete?: () => void;
}

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({
    question,
    onChange,
    onDelete
}) => {
    const [editedQuestion, setEditedQuestion] = useState<TrueFalseQuestion>({
        ...question,
        type: 'true-false',
        text: question.text || '',
        points: question.points || 1,
        correctAnswer: question.correctAnswer || false
    });

    // Generate unique IDs NOTE: test all fields and labels, make sure they're connected properly.
    const questionId = question._id || Math.random().toString(36).substring(7);
    const trueId = `true-${questionId}`;
    const falseId = `false-${questionId}`;
    const radioName = `correctAnswer-${questionId}`;

    useEffect(() => {
        onChange(editedQuestion);
    }, [editedQuestion]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Question Text</label>
                        <input
                            type="text"
                            className="form-control"
                            value={editedQuestion.text}
                            onChange={(e) =>
                                setEditedQuestion({ ...editedQuestion, text: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Points</label>
                        <input
                            type="number"
                            className="form-control"
                            value={editedQuestion.points}
                            onChange={(e) =>
                                setEditedQuestion({
                                    ...editedQuestion,
                                    points: parseInt(e.target.value) || 0
                                })
                            }
                            min="0"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label d-block">Correct Answer</label>
                        <div className="btn-group" role="group">
                            <input
                                type="radio"
                                className="btn-check"
                                name={radioName}
                                id={trueId}
                                checked={editedQuestion.correctAnswer === true}
                                onChange={() =>
                                    setEditedQuestion({
                                        ...editedQuestion,
                                        correctAnswer: true
                                    })
                                }
                            />
                            <label className="btn btn-outline-primary" htmlFor={trueId}>
                                True
                            </label>

                            <input
                                type="radio"
                                className="btn-check"
                                name={radioName}
                                id={falseId}
                                checked={editedQuestion.correctAnswer === false}
                                onChange={() =>
                                    setEditedQuestion({
                                        ...editedQuestion,
                                        correctAnswer: false
                                    })
                                }
                            />
                            <label className="btn btn-outline-primary" htmlFor={falseId}>
                                False
                            </label>
                        </div>
                    </div>

                    <div className="d-flex gap-2">
                        {onDelete && (
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={onDelete}
                            >
                                Delete Question
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrueFalseEditor; 