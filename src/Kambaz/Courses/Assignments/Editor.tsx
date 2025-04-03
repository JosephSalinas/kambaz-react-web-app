import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    if (!cid) {
        return <div className="alert alert-danger">Missing course ID</div>;
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
    const currentAssignment = assignments.find((a: any) => a._id === aid && a.course === cid);

    const [title, setTitle] = useState(currentAssignment?.title || "");
    const [description, setDescription] = useState(currentAssignment?.description || "");
    const [points, setPoints] = useState(currentAssignment?.points || 100);
    const [dueDate, setDueDate] = useState(currentAssignment?.dueDate || "");
    const [availableFrom, setAvailableFrom] = useState(currentAssignment?.availableFrom || "");
    const [availableUntil, setAvailableUntil] = useState(currentAssignment?.availableUntil || "");

    useEffect(() => {
        if (currentAssignment) {
            setTitle(currentAssignment.title);
            setDescription(currentAssignment.description);
            setPoints(currentAssignment.points);
            setDueDate(currentAssignment.dueDate);
            setAvailableFrom(currentAssignment.availableFrom);
            setAvailableUntil(currentAssignment.availableUntil);
        }
    }, [currentAssignment]);

    const saveAssignment = async () => {
        let savedAssignment;

        if (aid === "new") {
            // Create new assignment
            const newAssignment = {
                title,
                description,
                points,
                dueDate,
                availableFrom,
                availableUntil,
                course: cid,
            };
            savedAssignment = await assignmentsClient.createAssignment(cid, newAssignment);
            dispatch(addAssignment(savedAssignment));
        } else {
            // Update existing assignment
            const updated = {
                _id: aid,
                course: cid,
                title,
                description,
                points,
                dueDate,
                availableFrom,
                availableUntil,
            };
            await assignmentsClient.updateAssignment(updated);
            dispatch(updateAssignment(updated));
        }

        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };


    return (
        <div id="wd-assignments-editor" className="container mt-4">
            <div className="mb-3">
                <label className="form-label fw-bold">Assignment Name</label>
                <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Description</label>
                <textarea className="form-control" rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Points</label>
                <input type="number" className="form-control" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Due Date</label>
                <div className="input-group">
                    <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    <span className="input-group-text bg-white border">
                        <FaCalendarAlt className="text-muted" />
                    </span>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label fw-bold">Available From</label>
                    <div className="input-group">
                        <input type="date" className="form-control" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
                        <span className="input-group-text bg-white border">
                            <FaCalendarAlt className="text-muted" />
                        </span>
                    </div>
                </div>

                <div className="col-md-6">
                    <label className="form-label fw-bold">Until</label>
                    <div className="input-group">
                        <input type="date" className="form-control" value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} />
                        <span className="input-group-text bg-white border">
                            <FaCalendarAlt className="text-muted" />
                        </span>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Assign To</label>
                <div className="input-group">
                    <input type="text" className="form-control" defaultValue="Everyone" />
                    <span className="input-group-text bg-white border">
                        <IoClose className="text-muted" />
                    </span>
                </div>
            </div>

            <hr />
            <div className="d-flex justify-content-end">
                <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">Cancel</Link>
                <button className="btn btn-danger" onClick={saveAssignment}>Save</button>
            </div>
        </div>
    );
}
