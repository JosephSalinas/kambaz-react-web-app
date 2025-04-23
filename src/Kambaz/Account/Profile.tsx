import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const updateProfile = async () => {
        try {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
            setProfile(updatedProfile);
            setUpdateSuccess(true);
            // clear success message after 3 seconds
            setTimeout(() => setUpdateSuccess(false), 3000);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const fetchProfile = () => {
        if (!currentUser) {
            navigate("/Kambaz/Account/Signin");
            return;
        }
        setProfile(currentUser);
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kambaz/Account/Signin");
    };

    useEffect(() => { fetchProfile(); }, [currentUser]);

    if (!profile) return null;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="mb-0">Profile</h3>
                        </div>
                        <div className="card-body">
                            {updateSuccess && (
                                <div className="alert alert-success" role="alert">
                                    Profile updated successfully!
                                </div>
                            )}
                            
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    id="username"
                                    value={profile.username || ''}
                                    className="form-control"
                                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={profile.password || ''}
                                    className="form-control"
                                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">First Name</label>
                                <input
                                    id="firstName"
                                    value={profile.firstName || ''}
                                    className="form-control"
                                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input
                                    id="lastName"
                                    value={profile.lastName || ''}
                                    className="form-control"
                                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="dob" className="form-label">Date of Birth</label>
                                <input
                                    id="dob"
                                    type="date"
                                    value={profile.dob || ''}
                                    className="form-control"
                                    onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={profile.email || ''}
                                    className="form-control"
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select
                                    id="role"
                                    value={profile.role || 'STUDENT'}
                                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                    className="form-control"
                                >
                                    <option value="STUDENT">Student</option>
                                    <option value="FACULTY">Faculty</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="USER">User</option>
                    </select>
                            </div>

                            <div className="d-grid gap-2">
                                <button onClick={updateProfile} className="btn btn-primary">
                                    Update Profile
                                </button>
                                <button onClick={signout} className="btn btn-danger" id="wd-signout-btn">
                                    Sign Out
                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}