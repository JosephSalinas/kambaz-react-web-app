import React, { useState, useEffect } from 'react';

interface Option {
    text: string;
    isCorrect: boolean;
}

interface MultipleChoiceQuestion {
    _id?: string;
    type: 'multiple-choice';
    text: string;
    points: number;
    options: Option[];
    orderIndex?: number;
}

interface MultipleChoiceEditorProps {
    question: MultipleChoiceQuestion;
    onChange: (question: MultipleChoiceQuestion) => void;
    onDelete?: () => void;
}

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
    question,
    onChange,
    onDelete
}) => {
    const [editedQuestion, setEditedQuestion] = useState<MultipleChoiceQuestion>({
        ...question,
        type: 'multiple-choice',
        text: question.text || '',
        points: question.points || 1,
        options: question.options || [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
        ]
    });

    // ID generator, could just make monotonically increasing but this is fine
    const questionId = question._id || Math.random().toString(36).substring(7);

    useEffect(() => {
        onChange(editedQuestion);
    }, [editedQuestion]);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...editedQuestion.options];
        newOptions[index] = { ...newOptions[index], text: value };
        setEditedQuestion({ ...editedQuestion, options: newOptions });
    };

    const handleCorrectAnswerChange = (index: number) => {
        const newOptions = editedQuestion.options.map((option, i) => ({
            ...option,
            isCorrect: i === index
        }));
        setEditedQuestion({ ...editedQuestion, options: newOptions });
    };

    const addOption = () => {
        setEditedQuestion({
            ...editedQuestion,
            options: [...editedQuestion.options, { text: '', isCorrect: false }]
        });
    };

    const removeOption = (index: number) => {
        if (editedQuestion.options.length <= 2) return;
        const newOptions = editedQuestion.options.filter((_, i) => i !== index);
        setEditedQuestion({ ...editedQuestion, options: newOptions });
    };

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
                        <label className="form-label">Options</label>
                        {editedQuestion.options.map((option, index) => (
                            <div key={index} className="input-group mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Option ${index + 1}`}
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <input
                                            type="radio"
                                            name={`correctAnswer-${questionId}`}
                                            checked={option.isCorrect}
                                            onChange={() => handleCorrectAnswerChange(index)}
                                        />
                                    </div>
                                </div>
                                {editedQuestion.options.length > 2 && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() => removeOption(index)}
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={addOption}
                        >
                            Add Option
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

export default MultipleChoiceEditor; 