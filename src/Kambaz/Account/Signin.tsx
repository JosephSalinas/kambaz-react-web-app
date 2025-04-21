import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/Kambaz/Dashboard");
    };
    return (
        <div id="wd-signin-screen">
            <h1>Sign in</h1>
            <h3>Joseph Salinas, Section 2</h3>
            <h4>Links:</h4>
            <a href="https://github.com/JosephSalinas/kambaz-react-web-app/tree/P">React App</a> &nbsp;
            <a href="https://github.com/JosephSalinas/kambaz-node-server-app/tree/P">Node Server</a>
            <input defaultValue={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="form-control mb-2" placeholder="username" id="wd-username" />
            <input defaultValue={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="form-control mb-2" placeholder="password" type="password" id="wd-password" />
            <button onClick={signin} id="wd-signin-btn" className="btn btn-primary w-100" > Sign in </button>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>
        </div>
    );
}
