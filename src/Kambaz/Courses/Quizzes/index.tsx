import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findQuizzesForCourse } from "./client";
import { setQuizzes, setLoading, setError } from "./reducer";
import QuizList from "./QuizList";
import "./styles.css";

function Quizzes() {
    const { cid } = useParams<{ cid: string }>();
    const dispatch = useDispatch();
    const { quizzes, loading, error } = useSelector((state: any) => state.quizzes);

    useEffect(() => {
        const loadQuizzes = async () => {
            try {
                dispatch(setLoading(true));
                const quizzes = await findQuizzesForCourse(cid!);
                dispatch(setQuizzes(quizzes));
            } catch (error: any) {
                dispatch(setError(error.message));
            }
        };
        loadQuizzes();
    }, [cid, dispatch]);

    console.log("The courseId is", cid);

    if (loading) return <div>Loading...</div>;
    // Should be obselete when API is implemented
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="p-4">
            <h2>Quizzes</h2>
            <div className="row">
                <div className="col">
                    <QuizList quizzes={quizzes} />
                </div>
            </div>
        </div>
    );
}

export default Quizzes; 