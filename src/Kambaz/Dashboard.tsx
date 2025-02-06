import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-4 mb-4">
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/react.svg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                  <FaRegEdit size={24} style={{ cursor: 'pointer' }} />
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1010/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/writing.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">ENGW1010 Writing</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Professional Writing</Card.Text>
                  <FaRegEdit size={24} style={{ cursor: 'pointer' }} />
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/2030/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/chemistry.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">SCI2030</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Intermediary Chemistry</Card.Text>
                  <FaRegEdit size={24} style={{ cursor: 'pointer' }} />
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1160/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/philosophy.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">PHIL1160</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Introduction to Philosophy</Card.Text>
                  <FaRegEdit size={24} style={{ cursor: 'pointer' }} />
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
        <Row xs={1} md={4} className="g-4 mb-4">
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/4700/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/networking.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS4700</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Network Fundamentals</Card.Text>
                  <FaRegEdit size={24} style={{ cursor: 'pointer' }} />
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1270/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/history.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">HIST1270</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Roman History</Card.Text>
                  <FaRegEdit size={24} style={{ cursor: 'pointer' }} />
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1000/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/python.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1000</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Python Programmer</Card.Text>
                  <FaRegEdit size={24} style={{ cursor: 'pointer' }} />
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1300/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/bird.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">SCI1300</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Bird Theory</Card.Text>
                  <FaRegEdit size={24} style={{ cursor: 'pointer' }} />
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
