import React, { Component, Fragment } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { connect } from "react-redux"
import LoadingBar from "react-redux-loading"
import { handleInitialData } from "../actions/shared"

import Nav from "./Nav"
import Footer from "./Footer"

import Dashboard from "./Dashboard"
import NewQuestion from "./NewQuestion"
import QuestionPage from "./QuestionPage"
import LeaderBoard from "./LeaderBoard"
import Login from "./Login"
import Logout from "./Logout"
import PageNotFound from "./PageNotFound"

class App extends Component {
  
  state = { activeIndex: 0 }

  handleTabChange = (e, { activeIndex }) => {
    this.setState({ activeIndex })
  }

  resetActiveIndexToZero = () => {
    
    this.setState({ activeIndex: 0 })
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { authedUser } = this.props

    if (!authedUser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      )
    }

    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar style={{ zIndex: 1000 }} />
          <Nav />
          <div className="ui main text container" style={{ marginTop: "7em" }}>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return (
                    <Dashboard
                      handleTabChange={this.handleTabChange}
                      activeIndex={this.state.activeIndex}
                    />
                  )
                }}
              />
              <Route
                path="/add"
                render={history => {
                  return (
                    <NewQuestion
                      resetActiveIndexToZero={this.resetActiveIndexToZero}
                      history={history.history}
                    />
                  )
                }}
              />
              <Route path="/questions/:question_id" component={QuestionPage} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/logout" component={Logout} />
              <Route path="/404" component={PageNotFound} />
              <Route path="/" component={PageNotFound} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  
  const { authedUser } = state
  return { authedUser }
}

export default connect(
  mapStateToProps
)(App)
