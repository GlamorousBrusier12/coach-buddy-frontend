import Course from "./Course";

import React, { useEffect, useState } from "react";

const EnrolledCourses = (props) => {
  // const [user, setUser] = useState({});
  // const { email } = props;
  // console.log("rendereed");
  // useEffect(() => {
  //   fetch(`http://localhost:3001/api/user/${email}`)
  //     .then((res) => {
  //       console.log("res from the server ", res);
  //       return res.json();
  //     })
  //     .then((u) => {
  //       setUser(u.data);
  //       console.log(user);
  //       console.log(email);
  //     });
  // }, [props.email]);
  const { user } = props;

  return (
    <div>
      <ul
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        className="cards"
      >
        {user.enrolledCourses &&
          user.enrolledCourses.map((c, i) => {
            return (
              <li key={i}>
                <Course data={c} key={i} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default EnrolledCourses;
