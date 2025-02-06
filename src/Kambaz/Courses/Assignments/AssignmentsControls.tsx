import { FaSearch } from "react-icons/fa";
export default function AssignmentsControls() {
    return (
        <div className="d-flex align-items-center mb-3">
            <div className="input-group me-2" style={{ width: "250px" }}>
                <span className="input-group-text"><FaSearch /></span>
                <input type="text" className="form-control" placeholder="Search..." id="wd-search-assignment" />
            </div>
            <button id="wd-add-assignment-group" className="btn btn-outline-secondary me-2">+ Group</button>
            <button id="wd-add-assignment" className="btn btn-danger">+ Assignment</button>
        </div>
    );
}
