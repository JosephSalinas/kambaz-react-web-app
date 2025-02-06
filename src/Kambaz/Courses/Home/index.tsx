import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
    return (
        <div className="d-flex" id="wd-home">
            <div className="flex-fill">
                <Modules />
            </div>
            <div className="d-none ms-5 d-md-block">
                <CourseStatus />
            </div>
        </div>
    );
}
