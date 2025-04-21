import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

// fetch all quizzes for a course
export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses/${courseId}/quizzes`);
    return response.data;
};

// create a new quiz
export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axiosWithCredentials.post(
        `${REMOTE_SERVER}/api/courses/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};

// delete quiz
export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

// update quiz
export const updateQuiz = async (quizId: string, quiz: any) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quiz);
    return response.data;
};

// get quiz by ID
export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

// submit quiz attempt
export const submitQuizAttempt = async (quizId: string, attempt: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, attempt);
    return response.data;
};

// get quiz attempts for a user
export const getQuizAttempts = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
    return response.data;
};

// get current user quiz attempts
export const getCurrentUserQuizAttempts = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/current`);
    return response.data;
};

// Get last attempt score [NOTE!: implement display UI.]
export const getLastAttemptScore = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/last-score`);
    return response.data;
};

// boolean that checks published field, dates, attempts etc to determine elligibility
export const canTakeQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/can-take`);
    return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
};

export const createQuestion = async (quizId: string, question: any) => {
    const response = await axiosWithCredentials.post(
        `${QUIZZES_API}/${quizId}/questions`,
        question
    );
    return response.data;
};

export const updateQuestion = async (questionId: string, question: any) => {
    const response = await axiosWithCredentials.put(
        `${REMOTE_SERVER}/api/questions/${questionId}`,
        question
    );
    return response.data;
};

export const deleteQuestion = async (questionId: string) => {
    const response = await axiosWithCredentials.delete(
        `${REMOTE_SERVER}/api/questions/${questionId}`
    );
    return response.data;
};

export const findQuestionById = async (questionId: string) => {
    const response = await axiosWithCredentials.get(
        `${REMOTE_SERVER}/api/questions/${questionId}`
    );
    return response.data;
}; 