import React, { useEffect, useState } from "react";
import EnrolledCourses from "./EnrolledCourses";
import { toast } from "react-toastify";
const EnrollForm = (props) => {
  const { courses } = props;
  const [courseid, setCourseid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userEmail = "abc@gmail.com";
  const [trigger, setTrigger] = useState("abc@gmail.com");
  const [user, setUser] = useState({});
  useEffect(() => {
    fetchUser();
  }, []);

  const getUrl = (e) => {
    setCourseid(e.target.value);
  };

  const fetchUser = () => {
    fetch(`http://localhost:3001/api/user/${userEmail}`)
      .then((res) => {
        // console.log("res from the server ", res);
        return res.json();
      })
      .then((u) => {
        setUser(u.data);
        // console.log(user);
      });
  };
  const enrollCourse = () => {
    const postObj = { name: name, email: email };
    // console.log(postObj);
    fetch(`http://localhost:3001/api/course/enroll/${courseid}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "already registered") {
          toast.warning(res.message);
        } else if (
          res.message === "already in the waiting list for the course"
        ) {
          toast.warning(res.message);
        } else if (
          res.message === "max capacity reached, entered into waiting list"
        ) {
          toast.success("max capacity reached, entered into waiting list");
        } else if (res.message === "sucessfully enrolled") {
          toast.success(res.message);
        }
        // setTrigger(userEmail);
        // console.log("triggered");
        fetchUser();
      });
  };

  const unenrollCourse = () => {
    const postObj = { name: name, email: email };
    // console.log(postObj);
    fetch(`http://localhost:3001/api/course/unenroll/${courseid}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((res) => {
        // console.log("res from the server", res);
        if (res.message === "cannot unenroll in last minute") {
          toast.error("couldnt unenroll");
          console.log(res.message);
        } else if (res.status === "unenrolled") {
          toast.success(res.status);
        }
        setTrigger(userEmail);
        fetchUser();
      });
  };
  return (
    <div id="enroll-mail-container">
      <h1>Course Enrollment Form</h1>
      <p> currently test with abc@gmail.com </p>
      <div className="enroll-form-container">
        <form
          style={{
            width: "40vw",
            paddingLeft: 100,
          }}
        >
          <div className="mb-3">
            <label htmlFor="user-name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="user-name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="user-email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="user-email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>

          <label htmlFor="course">Choose a course:</label>

          <select
            name="course"
            id="course"
            onChange={(e) => {
              getUrl(e);
            }}
            required
            className="form-select"
          >
            <option disabled selected value>
              -- select a course--
            </option>
            {courses.map((course, index) => {
              return (
                <option value={course._id} key={course._id}>
                  {course.name}
                </option>
              );
            })}
          </select>
          <button
            onClick={(e) => {
              e.preventDefault();
              enrollCourse();
            }}
            className="btn btn-primary m-3"
          >
            Enroll
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              unenrollCourse();
            }}
            style={{ margin: "10" }}
            className="btn btn-primary m-3"
          >
            unenroll
          </button>
        </form>
      </div>
      <div id="enrolled-courses">
        <EnrolledCourses email={trigger} user={user} />
      </div>
    </div>
  );
};

export default EnrollForm;
