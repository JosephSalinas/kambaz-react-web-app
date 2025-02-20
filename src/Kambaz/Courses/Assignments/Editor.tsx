import { useParams, Link } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import * as db from "../../Database";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const assignment = db.assignments.find(a => a._id === aid && a.course === cid);

    // Added in the event there isn't an assignment
    if (!assignment) {
        return <div className="alert alert-danger">No Assignment found.</div>;
    }

    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label fw-bold">Assignment Name</label>
                <input id="wd-name" className="form-control" defaultValue={assignment.title} />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label fw-bold">Description</label>
                <textarea id="wd-description" className="form-control" rows={5} defaultValue="Empty for now" />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-points" className="form-label fw-bold">Points</label>
                <input id="wd-points" type="number" className="form-control" defaultValue={100} />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-group" className="form-label fw-bold">Assignment Group</label>
                <select id="wd-group" className="form-control">
                    <option value="assignments" selected>ASSIGNMENTS</option>
                    <option value="quizzes">Quizzes</option>
                    <option value="projects">Projects</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="wd-display-grade-as" className="form-label fw-bold">Display Grade as</label>
                <select id="wd-display-grade-as" className="form-control">
                    <option value="percentage" selected>Percentage</option>
                    <option value="points">Points</option>
                    <option value="complete/incomplete">Complete/Incomplete</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="wd-submission-type" className="form-label fw-bold">Submission Type</label>
                <select id="wd-submission-type" className="form-control">
                    <option value="online" selected>Online</option>
                    <option value="on-paper">On Paper</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Online Entry Options</label>
                {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map(option => (
                    <div className="form-check" key={option}>
                        <input type="checkbox" className="form-check-input" id={`wd-${option.toLowerCase().replace(" ", "-")}`} />
                        <label className="form-check-label" htmlFor={`wd-${option.toLowerCase().replace(" ", "-")}`}>{option}</label>
                    </div>
                ))}
            </div>
            <div className="mb-3">
                <label htmlFor="wd-assign-to" className="form-label fw-bold">Assign to</label>
                <div className="input-group">
                    <input id="wd-assign-to" type="text" className="form-control" defaultValue="Everyone" />
                    <span className="input-group-text bg-white border">
                        <IoClose className="text-muted" />
                    </span>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
                <div className="input-group">
                    <input id="wd-due-date" type="date" className="form-control" defaultValue="2024-05-13" />
                    <span className="input-group-text bg-white border">
                        <FaCalendarAlt className="text-muted" />
                    </span>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
                    <div className="input-group">
                        <input id="wd-available-from" type="date" className="form-control" defaultValue="2024-05-06" />
                        <span className="input-group-text bg-white border">
                            <FaCalendarAlt className="text-muted" />
                        </span>
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
                    <div className="input-group">
                        <input id="wd-available-until" type="date" className="form-control" defaultValue="2024-05-28" />
                        <span className="input-group-text bg-white border">
                            <FaCalendarAlt className="text-muted" />
                        </span>
                    </div>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-end">
                <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
                <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
            </div>
        </div>
    );
}
