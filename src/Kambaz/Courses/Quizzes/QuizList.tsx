import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteQuiz, updateQuiz } from "./reducer";
import QuizDetails from "./QuizDetails";
import * as client from "./client";

interface QuizStatus {
    lastScore?: number;
    attemptsUsed: number;
    canTake: boolean;
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
    questionsList?: any[];
    maxAttempts: number;
    multipleAttempts: boolean;
    showCorrectAnswers: boolean;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
}

interface QuizListProps {
    quizzes: Quiz[];
}

function QuizList({ quizzes }: QuizListProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cid } = useParams<{ cid: string }>();
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === 'FACULTY';
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [quizStatuses, setQuizStatuses] = useState<Record<string, QuizStatus>>({});

    // filter quizzes for students to only show published ones
    const displayedQuizzes = isFaculty ? quizzes : quizzes.filter(quiz => quiz.published);

    useEffect(() => {
        const loadQuizStatuses = async () => {
            if (!isFaculty) {
                const statuses: Record<string, QuizStatus> = {};
                for (const quiz of quizzes) {
                    try {
                        const [lastAttempt, canTakeResponse] = await Promise.all([
                            client.getLastAttemptScore(quiz._id),
                            client.canTakeQuiz(quiz._id)
                        ]);
                        statuses[quiz._id] = {
                            lastScore: lastAttempt?.score,
                            attemptsUsed: lastAttempt?.attemptNumber || 0,
                            canTake: canTakeResponse.canTake
                        };
                    } catch (error) {
                        console.error(`error for loading status, quiz: ${quiz._id}:`, error);
                    }
                }
                setQuizStatuses(statuses);
            }
        };
        loadQuizStatuses();
    }, [quizzes, isFaculty]);

    const handleDelete = async (quizId: string) => {
        try {
            await client.deleteQuiz(quizId);
            dispatch(deleteQuiz(quizId));
        } catch (error) {
            console.error("failed to dellete quiz:", error);
        }
    };

    const handleEdit = (quiz: Quiz) => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/edit/${quiz._id}`);
    };

    const handlePreview = (quiz: Quiz) => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/preview/${quiz._id}`);
    };

    const handleTakeQuiz = (quiz: Quiz) => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/take/${quiz._id}`);
    };

    const handlePublishToggle = async (quiz: Quiz) => {
        try {
            const updatedQuiz = await client.updateQuiz(quiz._id, {
                ...quiz,
                published: !quiz.published
            });
            dispatch(updateQuiz(updatedQuiz));
        } catch (error) {
            console.error("failed to update quiz publish field:", error);
        }
    };

    const getAvailabilityStatus = (quiz: Quiz) => {
        const now = new Date();
        const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
        const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;
    
    const closed = availableUntil && now > availableUntil;

        if (closed) {
            return <span className="badge bg-danger">Closed</span>;
        }

        if (availableFrom) {
            if (now < availableFrom) {
                return (
                    <span className="badge bg-warning">
                        Not available until {availableFrom.toLocaleDateString()}
                    </span>
                );
            }
            if (!availableUntil || now < availableUntil) {
                return <span className="badge bg-success">Available</span>;
            }
        }

        return <span className="badge bg-success">Available</span>;
    };

    const renderAttemptInfo = (quiz: Quiz) => {
        const status = quizStatuses[quiz._id];
        if (!status) return null;

        return (
            <>
                {status.lastScore !== undefined && (
                    <small className="text-muted">
                        Last Score: {status.lastScore.toFixed(1)}%
                    </small>
                )}
                <small className="text-muted">
                    Attempts: {status.attemptsUsed}/{quiz.maxAttempts}
                </small>
            </>
        );
    };

    const canTakeQuiz = (quiz: Quiz) => {
        const status = quizStatuses[quiz._id];
        if (!status) return false;

        const now = new Date();
        const availableFrom = quiz.availableFrom ? new Date(quiz.availableFrom) : null;
        const availableUntil = quiz.availableUntil ? new Date(quiz.availableUntil) : null;

        // annoying boolean, verify I actually did this right later
        const isWithinTimeWindow = (!availableFrom || now >= availableFrom) &&
                                 (!availableUntil || now <= availableUntil);

        return status.canTake && isWithinTimeWindow && quiz.published;
    };

    // NOTE: currently using emoticons for publish field for convenience, maybe change later
    return (
        <div className="row">
            <div className="col bg-light rounded-3 p-3">
                <div className="list-group">
                    {displayedQuizzes.map((quiz) => (
                        <div key={quiz._id} className="list-group-item rounded-3 border-dark-subtle mt-2">
                            <div className="d-flex justify-content-between align-items-start">
                                <div className="flex-grow-1">
                                    <div className="d-flex align-items-center gap-2">
                                        <h5 className="mb-1">{quiz.title}</h5>
                                        {isFaculty && (
                                            <button
                                                className="btn btn-link p-0 text-decoration-none"
                                                onClick={() => handlePublishToggle(quiz)}
                                                title={quiz.published ? "Unpublish Quiz" : "Publish Quiz"}
                                            >
                                                {quiz.published ? "✅" : "🚫"}
                                            </button>
                                        )}
                                    </div>
                                    {quiz.description && <p className="mb-1 fst-italic">{quiz.description}</p>}
                                    <div className="d-flex flex-wrap gap-2 align-items-center">
                                        {getAvailabilityStatus(quiz)}
                                        {quiz.dueDate && (
                                            <small className="text-muted">
                                                Due: {new Date(quiz.dueDate).toLocaleDateString()}
                                            </small>
                                        )}
                                        <small className="text-muted">
                                            Points: {quiz.totalPoints}
                                        </small>
                                        <small className="text-muted">
                                            Questions: {quiz.questionsList?.length || quiz.questions?.length || 0}
                                        </small>
                                        {!isFaculty && renderAttemptInfo(quiz)}
                                    </div>
                                </div>
                                <div className="btn-group mt-3">
                                    <button
                                        className="btn btn-outline-info"
                                        onClick={() => setSelectedQuiz(quiz)}
                                    >
                                        Details
                                    </button>
                                    {isFaculty ? (
                                        <>
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => handleEdit(quiz)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => handlePreview(quiz)}
                                            >
                                                Preview
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleDelete(quiz._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    ) : (
                                        canTakeQuiz(quiz) && (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleTakeQuiz(quiz)}
                                            >
                                                Take Quiz
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {displayedQuizzes.length === 0 && (
                        <div className="list-group-item text-center">
                            No quizzes available
                        </div>
                    )}
                    {isFaculty && (
                        <div className="mt-3">
                            <button
                                className="btn btn-success"
                                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/edit/new`)}
                            >
                                Create New Quiz
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {selectedQuiz && (
                <div className="col-4">
                    <QuizDetails
                        quiz={selectedQuiz}
                        onClose={() => setSelectedQuiz(null)}
                    />

                </div>
            )}
        </div>
    );
}

export default QuizList; 