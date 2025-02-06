import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end d-flex align-items-center">
            <span className="border px-2 py-1 rounded-pill text-secondary bg-white" style={{ fontSize: "0.9rem" }}>40% of Total</span>
            <BsPlus className="fs-3 ms-2" />
            <IoEllipsisVertical className="fs-4 ms-2" />
        </div>
    );
}