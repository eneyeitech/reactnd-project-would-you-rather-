import React, { Component } from "react"
import { connect } from "react-redux"
import { setAuthedUser } from "../actions/authedUser"

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthedUser(null))
  }

  render() {
    return <div>Logging out...</div>
  }
}

export default connect()(Logout)
