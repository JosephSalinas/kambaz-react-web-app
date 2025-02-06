import { FaCalendarAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label fw-bold">Assignment Name</label>
                <input id="wd-name" className="form-control" defaultValue="A1 - ENV + HTML" />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-description" className="form-label fw-bold">Description</label>
                <textarea id="wd-description" className="form-control" rows={5} defaultValue={`The assignment is available online. Submit a link to the landing page of
                    your web application running on Netlify. The landing page should include
                    the following: Your full name and section, links to each of the lab
                    assignments, links to the Kambaz application, and links to all relevant
                    source code repositories. The Kambaz application should include a link
                    to navigate back to the landing page.`} />
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
                <div className="form-check">
                    <input id="wd-text-entry" type="checkbox" className="form-check-input" />
                    <label className="form-check-label" htmlFor="wd-text-entry">Text Entry</label>
                </div>
                <div className="form-check">
                    <input id="wd-website-url" type="checkbox" className="form-check-input" defaultChecked />
                    <label className="form-check-label" htmlFor="wd-website-url">Website URL</label>
                </div>
                <div className="form-check">
                    <input id="wd-media-recordings" type="checkbox" className="form-check-input" />
                    <label className="form-check-label" htmlFor="wd-media-recordings">Media Recordings</label>
                </div>
                <div className="form-check">
                    <input id="wd-student-annotation" type="checkbox" className="form-check-input" />
                    <label className="form-check-label" htmlFor="wd-student-annotation">Student Annotation</label>
                </div>
                <div className="form-check">
                    <input id="wd-file-upload" type="checkbox" className="form-check-input" />
                    <label className="form-check-label" htmlFor="wd-file-upload">File Uploads</label>
                </div>
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
                <button type="button" className="btn btn-secondary me-2">Cancel</button>
                <button type="button" className="btn btn-danger">Save</button>
            </div>
        </div>
    );
}