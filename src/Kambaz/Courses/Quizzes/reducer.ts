interface QuizQuestion {
    _id: string;
    text: string;
    options: {
        text: string;
        isCorrect: boolean;
    }[];
    type: 'multiple-choice' | 'true-false' | 'essay';
    points: number;
    orderIndex: number;
}

interface Quiz {
    _id: string;
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
    dueDate?: Date;
    availableFrom?: Date;
    availableUntil?: Date;
    published: boolean;
    totalPoints: number;
    questions: string[];
    questionsList?: QuizQuestion[];
}

interface QuizState {
    quizzes: Quiz[];
    selectedQuiz: Quiz | null;
    loading: boolean;
    error: string | null;
    quizAttempts: any[];
}

import { createSlice } from "@reduxjs/toolkit";

const initialState: QuizState = {
    quizzes: [],
    selectedQuiz: null,
    loading: false,
    error: null,
    quizAttempts: []
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
            state.loading = false;
            state.error = null;
        },
        setSelectedQuiz: (state, action) => {
            state.selectedQuiz = action.payload;
            state.loading = false;
            state.error = null;
        },
        addQuiz: (state, action) => {
            state.quizzes.push(action.payload);
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz: Quiz) =>
                quiz._id === action.payload._id ? action.payload : quiz
            );
            if (state.selectedQuiz?._id === action.payload._id) {
                state.selectedQuiz = action.payload;
            }
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz: Quiz) => quiz._id !== action.payload
            );
            if (state.selectedQuiz?._id === action.payload) {
                state.selectedQuiz = null;
            }
        },
        setQuizAttempts: (state, action) => {
            state.quizAttempts = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {
    setQuizzes,
    setSelectedQuiz,
    addQuiz,
    updateQuiz,
    deleteQuiz,
    setQuizAttempts,
    setLoading,
    setError
} = quizzesSlice.actions;
export default quizzesSlice.reducer; 