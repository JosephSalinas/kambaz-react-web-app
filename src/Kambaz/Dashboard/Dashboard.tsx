import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { enroll, unenroll } from "./enrollmentsReducer";

export default function Dashboard({
  courses, course, setCourse, addNewCourse, deleteCourse, updateCourse
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const enrolledCourses = courses.filter((course) =>
    enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id)
  );

  const displayedCourses = showAllCourses ? courses : enrolledCourses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end" onClick={addNewCourse}>Add</button>
            <button className="btn btn-warning float-end me-2" onClick={updateCourse}>Update</button>
          </h5>
          <br />
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}


      {currentUser?.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end mb-3"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "All" : "My enrollment"}
        </button>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2> <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => {
            const isEnrolled = enrollments.some(
              (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id
            );

            return (
              <div className="wd-dashboard-course col" style={{ width: "300px" }} key={course._id}>
                <div className="card rounded-3 overflow-hidden">
                  <Link to={isEnrolled ? `/Kambaz/Courses/${course._id}/Home` : "#"}
                    className={`wd-dashboard-course-link text-decoration-none ${isEnrolled ? "text-dark" : "text-muted"}`}
                    onClick={(e) => !isEnrolled && e.preventDefault()}
                  >
                    <img src={course.imagePath || "images/writing.jpg"} width="100%" height={160} />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">{course.name}</h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description}
                      </p>
                      {isEnrolled ? (
                        <button className="btn btn-primary">Go</button>
                      ) : (
                        <span className="text-muted">Not Enrolled</span>
                      )}

                      {currentUser?.role === "FACULTY" && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}

                      {currentUser?.role === "STUDENT" && (
                        <button
                          className={`btn ${isEnrolled ? "btn-danger" : "btn-success"} float-end`}
                          onClick={(event) => {
                            event.preventDefault();
                            isEnrolled
                              ? dispatch(unenroll({ userId: currentUser._id, courseId: course._id }))
                              : dispatch(enroll({ userId: currentUser._id, courseId: course._id }));
                          }}
                        >
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
