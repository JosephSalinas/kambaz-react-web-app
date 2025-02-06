import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";


export default function Assignments() {
    return (
        <div>
            <AssignmentsControls /><br />
            <ul id="wd-assignments" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        ASSIGNMENTS
                        <AssignmentControlButtons />
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        <li className="wd-lesson list-group-item p-3 ps-1 border-left border-success">
                            <BsGripVertical className="me-2 fs-3" />
                            <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link">
                                A1 - ENV + HTML
                            </a>
                            <LessonControlButtons />
                            <p className="mt-2">Multiple Modules | <b>Not available until</b> May 6 at 12:00am |<br />
                                <b>Due</b> May 13 at 11:59pm | 100 pts
                            </p>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1 border-left border-success">
                            <BsGripVertical className="me-2 fs-3" />
                            <a href="#/Kambaz/Courses/1234/Assignments/124" className="wd-assignment-link">
                                A2 - CSS + BOOTSTRAP
                            </a>
                            <LessonControlButtons />
                            <p className="mt-2">Multiple Modules | <b>Not available until</b> May 13 at 12:00am |<br />
                                <b>Due</b> May 20 at 11:59pm | 100 pts
                            </p>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1 border-left border-success">
                            <BsGripVertical className="me-2 fs-3" />
                            <a href="#/Kambaz/Courses/1234/Assignments/125" className="wd-assignment-link">
                                A3 - JAVASCRIPT + REACT
                            </a>
                            <LessonControlButtons />
                            <p className="mt-2">Multiple Modules | <b>Not available until</b> May 20 at 12:00am |<br />
                                <b>Due</b> May 27 at 11:59pm | 100 pts
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
