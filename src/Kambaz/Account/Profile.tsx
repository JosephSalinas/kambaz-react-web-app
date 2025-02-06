import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <input defaultValue="alice" placeholder="username" className="wd-username form-control" />
            <input defaultValue="123" placeholder="password" type="password" className="wd-password form-control  mt-1" />
            <input defaultValue="Alice" placeholder="First Name" className="form-control mt-1" id="wd-firstname" />
            <input defaultValue="Wonderland" placeholder="Last Name" className="form-control mt-1" id="wd-lastname" />

            <div className="input-group">
                <input defaultValue="mm/dd/yyyy" type="date" className="form-control mt-1" id="wd-dob" />
                <span className="input-group-text bg-white">
                    <FaCalendarAlt className="mt-1" />
                </span>
            </div>

            <input defaultValue="alice@wonderland.com" className="form-control mt-1" type="email" id="wd-email" />
            <select defaultValue="FACULTY" id="wd-role" className="form-control mt-1">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select>
            <button type="button" className="btn btn-danger w-100 mt-2">
                <Link to="/Kambaz/Account/Signin" className="text-decoration-none text-white" >Sign out</Link>
            </button>
        </div>
    );
}

<div className="mb-3">
    <input id="wd-points" type="number" className="form-control mt-1" defaultValue={100} />
</div>