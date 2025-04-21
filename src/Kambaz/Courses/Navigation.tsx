import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { courses } from "../Database";

import "../styles.css";

export default function CourseNavigation() {
    const { pathname } = useLocation();
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 me-4 rounded-0">
            {links.map((link) => (
                <Link
                    key={link}
                    to={`/Kambaz/Courses/${course && course._id}/${link}`}
                    id={`wd-course-${link.toLowerCase()}-link`}
                    className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>
                    {link}
                </Link>
            ))}
        </div>
    );
}
