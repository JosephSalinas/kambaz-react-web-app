import { useSelector } from "react-redux";
import { BsPlus } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentsControls() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-assignments-controls" className="d-flex justify-content-between align-items-center">
      <h4>Assignments</h4>
      {currentUser?.role === "FACULTY" && (
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
        >
          <BsPlus className="fs-4 me-2" />
          Add Assignment
        </button>
      )}
    </div>
  );
}
