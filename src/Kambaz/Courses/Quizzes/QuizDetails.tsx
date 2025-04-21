import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as client from './client';

// setup typing interfaces
interface QuizAttempt {
    _id: string;
    score: number;
    submittedAt: Date;
    attemptNumber: number;
    userId?: string;
    userName?: string;
}

interface Quiz {
    _id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    availableFrom?: Date;
    availableUntil?: Date;
    published: boolean;
    totalPoints: number;
    questions: string[];
    maxAttempts: number;
    quizType?: string;
    assignmentGroup?: string;
    shuffleAnswers?: boolean;
    timeLimit?: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    accessCode?: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
}

interface QuizDetailsProps {
    quiz: Quiz;
    onClose: () => void;
}

function QuizDetails({ quiz, onClose }: QuizDetailsProps) {
    const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === 'FACULTY';

    useEffect(() => {
        const loadAttempts = async () => {
            try {
                const userAttempts = isFaculty 
                    ? await client.getQuizAttempts(quiz._id)
                    : await client.getCurrentUserQuizAttempts(quiz._id);
                setAttempts(userAttempts);
            } catch (error) {
                console.error('Error loading attempts:', error);
            }
        };
        loadAttempts();
    }, [quiz._id, isFaculty]);

    const formatDate = (date: Date | undefined) => {
        if (!date) return 'Not set';
        return new Date(date).toLocaleString();
    };

    // may change styling, for now fine.
    const renderFacultyDetails = () => (
        <>
            <div className="mb-3">
                <strong>Quiz Type:</strong> {quiz.quizType || 'Graded Quiz'}
            </div>
            <div className="mb-3">
                <strong>Assignment Group:</strong> {quiz.assignmentGroup || 'Quizzes'}
            </div>
            <div className="mb-3">
                <strong>Options:</strong>
                <ul className="list-unstyled ms-3">
                    <li>
                        <i className={`bi ${quiz.shuffleAnswers ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
                        {' '}Shuffle Answers
                    </li>
                    <li>
                        <i className={`bi ${quiz.multipleAttempts ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
                        {' '}Multiple Attempts
                    </li>
                    <li>
                        <i className={`bi ${quiz.showCorrectAnswers ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
                        {' '}Show Correct Answers
                    </li>
                    <li>
                        <i className={`bi ${quiz.oneQuestionAtATime ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
                        {' '}One Question at a Time
                    </li>
                    <li>
                        <i className={`bi ${quiz.lockQuestionsAfterAnswering ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
                        {' '}Lock Questions After Answering
                    </li>
                    <li>
                        <i className={`bi ${quiz.webcamRequired ? 'bi-check-circle' : 'bi-x-circle'}`}></i>
                        {' '}Webcam Required
                    </li>
                </ul>
            </div>
            {quiz.timeLimit && (
                <div className="mb-3">
                    <strong>Time Limit:</strong> {quiz.timeLimit} minutes
                </div>
            )}
            {quiz.accessCode && (
                <div className="mb-3">
                    <strong>Access Code:</strong> {quiz.accessCode}
                </div>
            )}
        </>
    );

    // may change styling, for now fine. Also check reqs to properly omit admin fields
    const renderStudentDetails = () => (
        <>
            <div className="mb-3">
                <strong>Total Points:</strong> {quiz.totalPoints}
            </div>
            <div className="mb-3">
                <strong>Questions:</strong> {quiz.questions.length}
            </div>
            <div className="mb-3">
                <strong>Maximum Attempts:</strong> {quiz.maxAttempts}
            </div>
            <div className="mb-3">
                <strong>Available From:</strong> {formatDate(quiz.availableFrom)}
            </div>
            <div className="mb-3">
                <strong>Available Until:</strong> {formatDate(quiz.availableUntil)}
            </div>
            <div className="mb-3">
                <strong>Due Date:</strong> {formatDate(quiz.dueDate)}
            </div>
        </>
    );

    const renderAttempts = () => {
        if (attempts.length === 0) return null;

        return (
            <div className="mt-4">
                <h6>{isFaculty ? 'Student Attempts' : 'Your Attempts'}</h6>
                <div className="table-responsive">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                {isFaculty && <th>Student</th>}
                                <th>Attempt #</th>
                                <th>Score</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attempts.map((attempt) => (
                                <tr key={attempt._id}>
                                    {isFaculty && <td>{attempt.userName || 'Unknown'}</td>}
                                    <td>{attempt.attemptNumber}</td>
                                    <td>{attempt.score.toFixed(1)}%</td>
                                    <td>{new Date(attempt.submittedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!isFaculty && (
                    <div className="text-muted small">
                        Attempts used: {attempts.length} / {quiz.maxAttempts}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Quiz Details</h5>
                <button className="btn-close" onClick={onClose}></button>
            </div>
            <div className="card-body">
                <h6 className="card-title">{quiz.title}</h6>
                {quiz.description && (
                    <p className="card-text">{quiz.description}</p>
                )}
                {isFaculty ? renderFacultyDetails() : renderStudentDetails()}
                {renderAttempts()}
            </div>
        </div>
    );
}

export default QuizDetails;
