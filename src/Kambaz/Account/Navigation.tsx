import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles.css";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const { pathname } = useLocation();
    const active = (path: string) => (pathname.includes(path) ? "active" : "");

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link}
                    to={`/Kambaz/Account/${link}`}
                    className={`list-group-item ${pathname === `/Kambaz/Account/${link}` ? 'active' : ''} border border-0`}
                >
                    {link}
                </Link>
            ))}
            {currentUser && currentUser.role === "ADMIN" && (
                <Link to={`/Kambaz/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link>)}
        </div>
    );
}