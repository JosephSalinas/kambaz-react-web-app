import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import AssignmentEditor from "./Assignments/Editor";
import CourseNavigation from "./Navigation";
import Assignments from "./Assignments";
import Modules from "./Modules";
import Home from "./Home";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizAttempt from "./Quizzes/QuizAttempt";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import * as courseClient from "./client.ts";
import { useEffect, useState } from "react";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        if (cid) {
            const users = await courseClient.findUsersForCourse(cid);
            setUsers(users);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable users={users} />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/edit/:quizId" element={<QuizEditor />} />
                        <Route path="Quizzes/preview/:quizId" element={<QuizAttempt isPreview={true} />} />
                        <Route path="Quizzes/take/:quizId" element={<QuizAttempt />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
