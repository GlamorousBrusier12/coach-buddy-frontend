import React from "react";
import Course from "./Course";

const Home = (props) => {
  const { courses } = props;
  return (
    <div id="home-container">
      {/* courses */}
      <div className="list-of-courses">
        <ul
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          className="cards"
        >
          {courses.map((c, i) => {
            return (
              <li key={i}>
                <Course data={c} key={i} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
