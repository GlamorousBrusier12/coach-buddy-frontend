import Course from "./Course";

import React, { Component } from "react";

export default class EnrolledCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    console.log("mounted");
    const { email } = this.props;
    fetch(`http://localhost:3001/api/user/${email}`)
      .then((res) => {
        console.log("res from the server ", res);
        return res.json();
      })
      .then((u) => {
        this.setState({ ...this.state, user: u.data });
        console.log(this.state);
      });
  }
  render() {
    return (
      <div>
        <ul
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          className="cards"
        >
          {this.state.user.enrolledCourses &&
            this.state.user.enrolledCourses.map((c, i) => {
              return (
                <li key={i}>
                  <Course data={c} key={i} />
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
