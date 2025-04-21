import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical, BsTrash } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteAssignment as deleteAssignmentReducer,
    setAssignments,
} from "./reducer";
import * as assignmentsClient from "./client";

export default function Assignments() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const assignments = useSelector((state: any) => state.assignmentsReducer.assignments)
        .filter((assignment: any) => assignment.course === cid);

    console.log("The courseId is", cid);

    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            const serverAssignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
            dispatch(setAssignments(serverAssignments));
        };
        fetchAssignments();
    }, [cid]);

    const handleDelete = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignmentReducer(assignmentId));
        setSelectedAssignment(null);
    };

    return (
        <div>
            <AssignmentsControls />
            <ul id="wd-assignments" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        ASSIGNMENTS
                        <AssignmentControlButtons />
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {assignments.map((assignment: any) => (
                            <li key={assignment._id} className="wd-lesson list-group-item p-3 ps-1 border-left border-success d-flex justify-content-between">
                                <div>
                                    <BsGripVertical className="me-2 fs-3" />
                                    <Link to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link">
                                        {assignment.title}
                                    </Link>
                                    <LessonControlButtons />
                                    <p className="mt-2">
                                        Multiple Modules | <b>Not available until</b> {assignment.availableFrom || "TBD"} |<br />
                                        <b>Due</b> {assignment.dueDate || "TBD"} | {assignment.points} pts
                                    </p>
                                </div>
                                {currentUser?.role === "FACULTY" && (
                                    <BsTrash
                                        className="text-danger fs-5 cursor-pointer"
                                        onClick={() => setSelectedAssignment(assignment)}
                                        role="button"
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>

            {selectedAssignment && (
                <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedAssignment(null)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete "{selectedAssignment.title}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setSelectedAssignment(null)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedAssignment._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
