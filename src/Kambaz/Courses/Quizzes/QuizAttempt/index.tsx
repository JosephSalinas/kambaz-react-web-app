import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from '../client';
import QuestionAttempt from './QuestionAttempt';
import AccessCodeModal from './AccessCodeModal';

interface QuizAttemptProps {
    isPreview?: boolean;
}

const QuizAttempt: React.FC<QuizAttemptProps> = ({ isPreview = false }) => {
    const { cid, quizId } = useParams<{ cid: string; quizId: string }>();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAccessCodeModal, setShowAccessCodeModal] = useState(false);
    const [accessVerified, setAccessVerified] = useState(false);

    useEffect(() => {
        const loadQuizAndQuestions = async () => {
            try {
                const quizData = await client.findQuizById(quizId!);
                setQuiz(quizData);
                
                // if quiz requires access code and not in preview mode, show modal
                if (quizData.accessCode && !isPreview) {
                    setShowAccessCodeModal(true);
                } else {
                    setAccessVerified(true);
                    await loadQuestions();
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Error loading quiz:', error);
                setLoading(false);
            }
        };
        loadQuizAndQuestions();
    }, [quizId]);

    const loadQuestions = async () => {
        try {
            const questionsData = await client.findQuestionsForQuiz(quizId!);
            setQuestions(questionsData);
            
            // initialize answers object
            const initialAnswers: Record<string, any> = {};
            questionsData.forEach((q: any) => {
                initialAnswers[q._id] = null;
            });
            setAnswers(initialAnswers);
        } catch (error) {
            console.error('Error loading questions:', error);
        }
    };

    const handleAccessCodeSubmit = async (code: string) => {
        if (code === quiz.accessCode) {
            setShowAccessCodeModal(false);
            setAccessVerified(true);
            await loadQuestions();
        } else {
            // might add a toast here later
            console.log("Access code is incorrect");
            navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        }
    };

    const handleAccessCodeCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    if (loading) return <div>loadin..</div>;
    if (!quiz) return <div>Quiz not foundd</div>;
    if (showAccessCodeModal) {
        return <AccessCodeModal onSubmit={handleAccessCodeSubmit} onCancel={handleAccessCodeCancel} />;
    }
    if (!accessVerified && !isPreview) return null;
    if (!questions.length) return <div>Loading questions...</div>;

    const handleAnswerChange = (questionId: string, answer: any) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        let totalPoints = 0;

        questions.forEach((question: any) => {
            const userAnswer = answers[question._id];
            totalPoints += question.points;

            switch (question.type) {
                case 'multiple-choice':
                    if (userAnswer !== null && 
                        question.options[userAnswer].isCorrect) {
                        correctAnswers += question.points;
                    }
                    break;
                case 'true-false':
                    if (userAnswer === question.correctAnswer) {
                        correctAnswers += question.points;
                    }
                    break;
                case 'fill-in-blank':
                    if (question.caseSensitive) {
                        if (question.correctAnswers.includes(userAnswer)) {
                            correctAnswers += question.points;
                        }
                    } else {
                        if (question.correctAnswers
                            .map((a: string) => a.toLowerCase())
                            .includes(userAnswer?.toLowerCase())) {
                            correctAnswers += question.points;
                        }
                    }
                    break;
            }
        });

        return (correctAnswers / totalPoints) * 100;
    };

    const handleSubmit = async () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setSubmitted(true);

        if (!isPreview) {
            try {
                await client.submitQuizAttempt(quizId!, {
                    answers,
                    score: finalScore
                });
            } catch (error) {
                console.error('Error submitting quiz:', error);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    return (
        <div className="container mt-4">
            {isPreview && (
                <div className="alert alert-info">
                    <strong>Preview Mode</strong> - This is how students will see the quiz. 
                    Your answers won't be saved.
                    <button 
                        className="btn btn-primary float-end"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/edit/${quizId}`)}
                    >
                        Edit Quiz
                    </button>
                </div>
            )}

            <div className="card">
                <div className="card-header">
                    <h3>{quiz.title}</h3>
                    <p className="text-muted mb-0">{quiz.description}</p>
                </div>
                <div className="card-body">
                    {submitted ? (
                        <div>
                            <h4>Quiz Results</h4>
                            <div className="alert alert-primary">
                                Your Score: {score?.toFixed(2)}%
                            </div>
                            <div className="mt-4">
                                {questions.map((question: any) => (
                                    <div key={question._id} className="mb-4">
                                        <QuestionAttempt
                                            question={question}
                                            answer={answers[question._id]}
                                            onChange={() => {}}
                                            showCorrect={true}
                                            isDisabled={true}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {quiz.oneQuestionAtATime ? (
                                <div>
                                    <QuestionAttempt
                                        question={questions[currentQuestionIndex]}
                                        answer={answers[questions[currentQuestionIndex]._id]}
                                        onChange={(answer) => 
                                            handleAnswerChange(questions[currentQuestionIndex]._id, answer)
                                        }
                                        showCorrect={false}
                                        isDisabled={false}
                                    />
                                    <div className="d-flex justify-content-between mt-3">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={handlePrevious}
                                            disabled={currentQuestionIndex === 0}
                                        >
                                            Previous
                                        </button>
                                        {currentQuestionIndex === questions.length - 1 ? (
                                            <button
                                                className="btn btn-primary"
                                                onClick={handleSubmit}
                                            >
                                                Submit Quiz
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-primary"
                                                onClick={handleNext}
                                            >
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {questions.map((question: any) => (
                                        <div key={question._id} className="mb-4">
                                            <QuestionAttempt
                                                question={question}
                                                answer={answers[question._id]}
                                                onChange={(answer) => handleAnswerChange(question._id, answer)}
                                                showCorrect={false}
                                                isDisabled={false}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleSubmit}
                                    >
                                        Submit Quiz
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizAttempt; 