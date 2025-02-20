import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments.filter(assignment => assignment.course === cid);

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
                        {assignments.map((assignment) => (
                            <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 border-left border-success">
                                <BsGripVertical className="me-2 fs-3" />
                                <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link">
                                    {assignment.title}
                                </Link>
                                <LessonControlButtons />
                                <p className="mt-2">Multiple Modules | <b>Not available until</b> TBD |<br />
                                    <b>Due</b> TBD | 100 pts
                                </p>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}