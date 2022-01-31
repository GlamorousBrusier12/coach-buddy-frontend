import React, { useState } from "react";
import EnrolledCourses from "./EnrolledCourses";
import { toast } from "react-toastify";
const EnrollForm = (props) => {
  const { courses } = props;
  const [courseid, setCourseid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userEmail = "abc@gmail.com";
  const getUrl = (e) => {
    setCourseid(e.target.value);
  };
  const enrollCourse = () => {
    const postObj = { name: name, email: email };
    console.log(postObj);
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
      });
  };

  const unenrollCourse = () => {
    const postObj = { name: name, email: email };
    console.log(postObj);
    fetch(`http://localhost:3001/api/course/unenroll/${courseid}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log("res from the server", res);
        if (res.message === "cannot unenroll in last minute") {
          toast.error("couldnt unenroll");
          console.log(res.message);
        } else if (res.status === "unenrolled") {
          toast.success(res.status);
        }
      });
  };
  return (
    <div id="enroll-mail-container">
      <div className="enroll-form-container">
        <form>
          <label htmlFor="user-name">Name:</label>
          <input
            type="text"
            id="user-name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            id="user-email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="course">Choose a course:</label>

          <select
            name="course"
            id="course"
            onChange={(e) => {
              getUrl(e);
            }}
            required
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
          >
            Enroll
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              unenrollCourse();
            }}
          >
            unenroll
          </button>
        </form>
      </div>
      <div id="enrolled-courses">
        <EnrolledCourses email={userEmail} />
      </div>
    </div>
  );
};

export default EnrollForm;
