import React from "react";

const Course = (props) => {
  const { name, description, duration, maxCapacity } = props.data;
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>{duration}</p>
      <p>{maxCapacity} Students</p>
    </div>
  );
};

export default Course;
