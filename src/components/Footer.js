import React, { Component } from "react"

class Footer extends Component {
  render() {
    return (
      <div
        className="ui inverted vertical footer segment grey"
        style={{ marginTop: "6em", padding: "3em 0" }}
      >
        <div className="ui container smaller" style={{ fontSize: "0.9em",textAlign:"center", color: "black" }}>
          {new Date().getFullYear()}, Would You Rather App by Abdulmumin Eneye Abdulkarim.
        </div>
      </div>
    )
  }
}

export default Footer
