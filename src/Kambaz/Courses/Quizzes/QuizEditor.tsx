import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addQuiz, updateQuiz, setSelectedQuiz } from "./reducer";
import QuizQuestionEditor from "./QuestionEditor";
import * as client from "./client";

// NOTE!: database needs changes to sync fill in blank questions. Fix later
interface Question {
    _id?: string;
    type: 'multiple-choice' | 'true-false' | 'fill-in-blank';
    text: string;
    points: number;
    orderIndex?: number;
    // may change how this works for now fine
    options?: { text: string; isCorrect: boolean }[];
    correctAnswer?: boolean;
    correctAnswers?: string[];
    caseSensitive?: boolean;
    [key: string]: any;
}

interface Quiz {
    _id?: string;
    courseId: string;
    title: string;
    description: string;
    quizType: string;
    assignmentGroup: string;
    shuffleAnswers: boolean;
    timeLimit: number;
    multipleAttempts: boolean;
    maxAttempts: number;
    showCorrectAnswers: boolean;
    accessCode?: string;
    oneQuestionAtATime: boolean;
    webcamRequired: boolean;
    lockQuestionsAfterAnswering: boolean;
    dueDate?: string;
    availableFrom?: string;
    availableUntil?: string;
    published: boolean;
    totalPoints: number;
    questions: string[];
    questionsList?: Question[];
}

function QuizEditor() {
    const { cid, quizId } = useParams<{ cid: string; quizId: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newQuestionType, setNewQuestionType] = useState<Question['type']>('multiple-choice');
    const [questions, setQuestions] = useState<any[]>([]);

    const formatDateForInput = (date: string | Date | undefined): string => {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d.getTime())) return '';
        // fix so react stops complaining about improper format defaulted from DB
        return d.toISOString().slice(0, 16);
    };

    const defaultQuiz: Quiz = {
        courseId: cid || "",
        title: "",
        description: "",
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        maxAttempts: 1,
        showCorrectAnswers: false,
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        published: false,
        totalPoints: 0,
        questions: []
    };

    const [quiz, setQuiz] = useState<Quiz>(defaultQuiz);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('details');
    const [editingQuestions, setEditingQuestions] = useState<Set<number>>(new Set());

    useEffect(() => {
        const loadQuiz = async () => {
            try {
                if (quizId && quizId !== 'new') {
                    const quizData = await client.findQuizById(quizId);
                    setQuiz({
                        ...quizData,
                        dueDate: formatDateForInput(quizData.dueDate),
                        availableFrom: formatDateForInput(quizData.availableFrom),
                        availableUntil: formatDateForInput(quizData.availableUntil)
                    });
                    const questionsData = await client.findQuestionsForQuiz(quizId);
                    setQuestions(questionsData);
                } else {
                    setQuiz(defaultQuiz);
                    setQuestions([]);
                }
            } catch (error) {
                console.error("Failed to load quiz:", error);
                setQuiz(defaultQuiz);
                setQuestions([]);
            } finally {
                setLoading(false);
            }
        };
        loadQuiz();
    }, [quizId, cid]);

    const addNewQuestion = () => {
        const newQuestion = {
            type: newQuestionType,
            text: "",
            points: 1,
            orderIndex: questions.length,
            options: newQuestionType === 'multiple-choice' ? [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ] : undefined,
            correctAnswer: newQuestionType === 'true-false' ? false : undefined,
            correctAnswers: newQuestionType === 'fill-in-blank' ? [''] : undefined,
            caseSensitive: newQuestionType === 'fill-in-blank' ? false : undefined
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleQuestionChange = (index: number, updatedQuestion: any) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = updatedQuestion;
        setQuestions(updatedQuestions);

        // computes total points for the quiz. Might move out of component file later
        const totalPoints = updatedQuestions.reduce((sum, q) => sum + (q.points || 0), 0);
        setQuiz({ ...quiz, totalPoints });
    };

    const handleQuestionDelete = async (index: number) => {
        const questionToDelete = questions[index];
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);

        // Also might move out of componenet file later
        const totalPoints = updatedQuestions.reduce((sum, q) => sum + (q.points || 0), 0);
        setQuiz({ ...quiz, totalPoints });

        // If question has an ID delete it 
        if (questionToDelete._id) {
            try {
                await client.deleteQuestion(questionToDelete._id);
                // update the quiz's questions array
                if (quiz._id) {
                    const updatedQuiz = {
                        ...quiz,
                        questions: quiz.questions.filter(id => id !== questionToDelete._id)
                    };
                    await client.updateQuiz(quiz._id, updatedQuiz);
                    setQuiz(updatedQuiz);
                }
            } catch (error) {
                console.error("question didn't delete", error);
                // Revert the state if deletion fails
                setQuestions([...questions]);
                setQuiz({ ...quiz });
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent, shouldPublish = false) => {
        e.preventDefault();
        try {
            let savedQuiz;
            if (quiz._id) {
                //Grab current questions. NOTE: fix error where questions aren't being mapped properly
                const currentQuestions = await client.findQuestionsForQuiz(quiz._id);
                const currentQuestionIds = new Set(currentQuestions.map((q: Question) => q._id as string));
                const newQuestionIds = new Set(questions.filter((q: Question) => q._id).map((q: Question) => q._id as string));

                // find questions that were deleted (in current but not in new)
                const deletedQuestionIds = [...currentQuestionIds].filter((id): id is string => typeof id === 'string' && !newQuestionIds.has(id));

                for (const questionId of deletedQuestionIds) {
                    await client.deleteQuestion(questionId);
                }

                // init with saved questions
                savedQuiz = await client.updateQuiz(quiz._id, {
                    ...quiz,
                    published: shouldPublish ? true : quiz.published,
                    questions: questions.filter(q => q._id).map(q => q._id)
                });

                // update existing questions and create new ones
                const questionIds = savedQuiz.questions || [];
                for (const question of questions) {
                    if (question._id) {
                        await client.updateQuestion(question._id, question);
                    } else {
                        const newQuestion = await client.createQuestion(quiz._id, question);
                        questionIds.push(newQuestion._id);
                    }
                }

                // final update with all question references. NOTE: bulk import endpoint?
                savedQuiz = await client.updateQuiz(quiz._id, {
                    ...savedQuiz,
                    questions: questionIds
                });
                dispatch(updateQuiz(savedQuiz));
            } else {
                // create new quiz
                savedQuiz = await client.createQuiz(cid!, {
                    ...quiz,
                    published: shouldPublish,
                    questions: []
                });

                const questionIds = savedQuiz.questions || [];
                for (const question of questions) {
                    const newQuestion = await client.createQuestion(savedQuiz._id, question);
                    questionIds.push(newQuestion._id);
                }

                // update quiz with question references
                savedQuiz = await client.updateQuiz(savedQuiz._id, {
                    ...savedQuiz,
                    questions: questionIds
                });
                dispatch(addQuiz(savedQuiz));
            }

            dispatch(setSelectedQuiz(savedQuiz));
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        } catch (error) {
            console.error("Failed to save quiz:", error);
        }
    };

    const toggleQuestionEdit = (index: number) => {
        const newEditing = new Set(editingQuestions);
        if (newEditing.has(index)) {
            newEditing.delete(index);
        } else {
            newEditing.add(index);
        }
        setEditingQuestions(newEditing);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{quizId !== 'new' ? "Edit Quiz" : "Create Quiz"}</h3>
                
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                            onClick={() => setActiveTab('details')}
                        >
                            Details
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'questions' ? 'active' : ''}`}
                            onClick={() => setActiveTab('questions')}
                        >
                            Questions
                        </button>
                    </li>
                </ul>

                <form onSubmit={(e) => handleSubmit(e, false)}>
                    {activeTab === 'details' && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={quiz.title}
                                    onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    value={quiz.description}
                                    onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                                />
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Due Date</label>
                                    <div className="date-input-wrapper">
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={quiz.dueDate || ''}
                                            onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Available From</label>
                                    <div className="date-input-wrapper">
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={quiz.availableFrom || ''}
                                            onChange={(e) => setQuiz({ ...quiz, availableFrom: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Available Until</label>
                                    <div className="date-input-wrapper">
                                        <input
                                            type="datetime-local"
                                            className="form-control"
                                            value={quiz.availableUntil || ''}
                                            onChange={(e) => setQuiz({ ...quiz, availableUntil: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Quiz Type</label>
                                    <select
                                        className="form-select"
                                        value={quiz.quizType}
                                        onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                                    >
                                        <option value="Graded Quiz">Graded Quiz</option>
                                        <option value="Practice Quiz">Practice Quiz</option>
                                        <option value="Survey">Survey</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Assignment Group</label>
                                    <select
                                        className="form-select"
                                        value={quiz.assignmentGroup}
                                        onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
                                    >
                                        <option value="Quizzes">Quizzes</option>
                                        <option value="Assignments">Assignments</option>
                                        <option value="Exams">Exams</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Time Limit (minutes)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={quiz.timeLimit}
                                        onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) || 0 })}
                                        min="0"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Maximum Attempts</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={quiz.maxAttempts}
                                        onChange={(e) => setQuiz({ ...quiz, maxAttempts: parseInt(e.target.value) || 1 })}
                                        min="1"
                                        disabled={!quiz.multipleAttempts}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label">Access Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={quiz.accessCode || ''}
                                        onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
                                        placeholder="Leave blank for no access code"
                                    />
                                    <small className="text-muted">
                                        Students will need to enter this code to access the quiz
                                    </small>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="shuffleAnswers"
                                            checked={quiz.shuffleAnswers}
                                            onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
                                        />
                                        <label className="form-check-label" htmlFor="shuffleAnswers">
                                            Shuffle Answers
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="multipleAttempts"
                                            checked={quiz.multipleAttempts}
                                            onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
                                        />
                                        <label className="form-check-label" htmlFor="multipleAttempts">
                                            Allow Multiple Attempts
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="showCorrectAnswers"
                                            checked={quiz.showCorrectAnswers}
                                            onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
                                        />
                                        <label className="form-check-label" htmlFor="showCorrectAnswers">
                                            Show Correct Answers After Submission
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="oneQuestionAtATime"
                                            checked={quiz.oneQuestionAtATime}
                                            onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
                                        />
                                        <label className="form-check-label" htmlFor="oneQuestionAtATime">
                                            Show One Question at a Time
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="lockQuestions"
                                            checked={quiz.lockQuestionsAfterAnswering}
                                            onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
                                        />
                                        <label className="form-check-label" htmlFor="lockQuestions">
                                            Lock Questions After Answering
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'questions' && (
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4>Questions</h4>
                                <div>
                                    <select
                                        className="form-select d-inline-block w-auto me-2"
                                        value={newQuestionType}
                                        onChange={(e) => setNewQuestionType(e.target.value as Question['type'])}
                                    >
                                        <option value="multiple-choice">Multiple Choice</option>
                                        <option value="true-false">True/False</option>
                                        <option value="fill-in-blank">Fill in the Blank</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={addNewQuestion}
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </div>

                            {questions.map((question, index) => (
                                <div key={question._id || index} className="card mb-3">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">Question {index + 1}</h5>
                                        <div className="btn-group">
                                            {editingQuestions.has(index) ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="btn btn-success"
                                                        onClick={() => toggleQuestionEdit(index)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={() => {
                                                            // Revert changes by re-fetching the original question if it exists
                                                            if (question._id) {
                                                                client.findQuestionById(question._id)
                                                                    .then(originalQuestion => {
                                                                        const updatedQuestions = [...questions];
                                                                        updatedQuestions[index] = originalQuestion;
                                                                        setQuestions(updatedQuestions);
                                                                    })
                                                                    .catch(console.error);
                                                            } else {
                                                                // For new questions, revert to the last saved state or remove if never saved
                                                                const updatedQuestions = [...questions];
                                                                if (!question._id) {
                                                                    // Remove unsaved new question
                                                                    updatedQuestions.splice(index, 1);
                                                                }
                                                                setQuestions(updatedQuestions);
                                                            }
                                                            setEditingQuestions(prev => {
                                                                const newSet = new Set(prev);
                                                                newSet.delete(index);
                                                                return newSet;
                                                            });
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    onClick={() => toggleQuestionEdit(index)}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {editingQuestions.has(index) ? (
                                        <div className="card-body">
                                            <QuizQuestionEditor
                                                key={question._id || index}
                                                question={question}
                                                onChange={(updatedQuestion) => handleQuestionChange(index, updatedQuestion)}
                                                onDelete={() => handleQuestionDelete(index)}
                                                index={index}
                                            />
                                        </div>
                                    ) : (
                                        <div className="card-body">
                                            <p><strong>Type:</strong> {question.type}</p>
                                            <p><strong>Question:</strong> {question.text}</p>
                                            <p><strong>Points:</strong> {question.points}</p>
                                            {question.type === 'multiple-choice' && (
                                                <div>
                                                    <strong>Options:</strong>
                                                    <ul>
                                                        {question.options?.map((opt: any, i: number) => (
                                                            <li key={i} className={opt.isCorrect ? 'text-success' : ''}>
                                                                {opt.text} {opt.isCorrect && '✓'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {question.type === 'true-false' && (
                                                <p><strong>Correct Answer:</strong> {question.correctAnswer ? 'True' : 'False'}</p>
                                            )}
                                            {question.type === 'fill-in-blank' && (
                                                <div>
                                                    <p><strong>Correct Answers:</strong></p>
                                                    <ul>
                                                        {question.correctAnswers?.map((ans: string, i: number) => (
                                                            <li key={i}>{ans}</li>
                                                        ))}
                                                    </ul>
                                                    <p><strong>Case Sensitive:</strong> {question.caseSensitive ? 'Yes' : 'No'}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                            {quiz._id ? "Save Changes" : "Create Quiz"}
                        </button>
                        <button type="button" className="btn btn-success" onClick={(e) => handleSubmit(e, true)}>
                            Save and Publish
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuizEditor; 