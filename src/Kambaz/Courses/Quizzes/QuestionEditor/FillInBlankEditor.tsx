import React, { useState, useEffect } from 'react';

// setup typing interfaces
interface FillInBlankQuestion {
    _id?: string;
    type: 'fill-in-blank';
    text: string;
    points: number;
    correctAnswers: string[];
    caseSensitive: boolean;
    orderIndex?: number;
}

interface FillInBlankEditorProps {
    question: FillInBlankQuestion;
    onChange: (question: FillInBlankQuestion) => void;
    onDelete?: () => void;
}

const FillInBlankEditor: React.FC<FillInBlankEditorProps> = ({
    question,
    onChange,
    onDelete
}) => {
    const [editedQuestion, setEditedQuestion] = useState<FillInBlankQuestion>({
        ...question,
        type: 'fill-in-blank',
        text: question.text || '',
        points: question.points || 1,
        correctAnswers: question.correctAnswers || [''],
        caseSensitive: question.caseSensitive || false
    });

    useEffect(() => {
        onChange(editedQuestion);
    }, [editedQuestion]);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...editedQuestion.correctAnswers];
        newAnswers[index] = value;
        setEditedQuestion({ ...editedQuestion, correctAnswers: newAnswers });
    };

    const addAnswer = () => {
        setEditedQuestion({
            ...editedQuestion,
            correctAnswers: [...editedQuestion.correctAnswers, '']
        });
    };

    const removeAnswer = (index: number) => {
        // NOTE: we need to keep at least 1 answer
        if (editedQuestion.correctAnswers.length <= 1) return;
        const newAnswers = editedQuestion.correctAnswers.filter((_, i) => i !== index);
        setEditedQuestion({ ...editedQuestion, correctAnswers: newAnswers });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    // NOTE: currently denote blank manually w/ brackets. Might change.
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
                            placeholder="Enter question text with [blank] for the fill-in part"
                            required
                        />
                        <small className="text-muted">
                            Use [blank] to indicate where students should fill in their answer
                        </small>
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
                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="caseSensitive"
                                checked={editedQuestion.caseSensitive}
                                onChange={(e) =>
                                    setEditedQuestion({
                                        ...editedQuestion,
                                        caseSensitive: e.target.checked
                                    })
                                }
                            />
                            <label className="form-check-label" htmlFor="caseSensitive">
                                Case sensitive answers
                            </label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correct Answers</label>
                        {editedQuestion.correctAnswers.map((answer, index) => (
                            <div key={index} className="input-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Correct Answer ${index + 1}`}
                                    value={answer}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    required
                                />
                                {editedQuestion.correctAnswers.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removeAnswer(index)}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={addAnswer}
                        >
                            Add Alternative Answer
                        </button>
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

export default FillInBlankEditor; 