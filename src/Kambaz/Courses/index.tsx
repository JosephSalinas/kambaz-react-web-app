import { Routes, Route, Navigate } from "react-router";
import AssignmentEditor from "./Assignments/Editor";
import CourseNavigation from "./Navigation";
import Assignments from "./Assignments";
import Modules from "./Modules";
import Home from "./Home";

export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 1234</h2>
            <hr />
            <table>
                <tr>
                    <td valign="top">
                        <CourseNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                            <Route path="People" element={<h2>People</h2>} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}
