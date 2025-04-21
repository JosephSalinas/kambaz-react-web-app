import React from 'react';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillInBlankEditor from './FillInBlankEditor';

interface QuestionEditorProps {
    question: any;
    onChange: (updatedQuestion: any) => void;
    onDelete?: () => void;
    index: number;
}

const QuizQuestionEditor: React.FC<QuestionEditorProps> = ({
    question,
    onChange,
    onDelete,
    index
}) => {
    const renderQuestionEditor = () => {
        const commonProps = {
            question,
            onChange
        };

        switch (question.type) {
            case 'multiple-choice':
                return <MultipleChoiceEditor {...commonProps} />;
            case 'true-false':
                return <TrueFalseEditor {...commonProps} />;
            case 'fill-in-blank':
                return <FillInBlankEditor {...commonProps} />;
            default:
                return <div>Unsupported question type</div>;
        }
    };

    return (
        <div className="quiz-question-editor card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Question {index + 1}</h5>
                {onDelete && (
                    <button 
                        className="btn btn-danger"
                        onClick={onDelete}
                    >
                        Delete Question
                    </button>
                )}
            </div>
            <div className="card-body">
                {renderQuestionEditor()}
            </div>
        </div>
    );
};

export default QuizQuestionEditor; 