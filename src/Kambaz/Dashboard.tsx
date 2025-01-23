import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/react.svg" width={200} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1010/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/writing.jpg" width={200} />
                        <div>
                            <h5> ENGW1010 Writing </h5>
                            <p className="wd-dashboard-course-title">
                                Professional Writing Introduction </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div> <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/2030/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/chemistry.jpg" width={200} />
                        <div>
                            <h5> SCI2030 </h5>
                            <p className="wd-dashboard-course-title">
                                Intermediary Chemistry </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div> <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1160/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/philosophy.jpg" width={200} />
                        <div>
                            <h5> PHIL1160 </h5>
                            <p className="wd-dashboard-course-title">
                                Introduction to Philosophy </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div> <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/4700/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/networking.jpg" width={200} />
                        <div>
                            <h5> CS4700 </h5>
                            <p className="wd-dashboard-course-title">
                                Network Fundamentals </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div> <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1270/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/history.jpg" width={200} />
                        <div>
                            <h5> HIST1270 </h5>
                            <p className="wd-dashboard-course-title">
                                Roman History </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div> <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1000/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/python.jpg" width={200} />
                        <div>
                            <h5> CS1000 </h5>
                            <p className="wd-dashboard-course-title">
                                Python Programmer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div> <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1300/Home"
                        className="wd-dashboard-course-link" >
                        <img src="/images/bird.jpg" width={200} />
                        <div>
                            <h5> SCI1300 </h5>
                            <p className="wd-dashboard-course-title">
                               Bird Theory </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
