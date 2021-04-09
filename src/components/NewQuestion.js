import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Card, Form, Image, Input, Message } from "semantic-ui-react"
import { handleAddQuestion } from "../actions/questions"

class NewQuestion extends Component {
  state = {
    optOne: "",
    optTwo: "",
    message: { hidden: true, content: "" }
  }

  handleOnChange = (e, data) => {
    this.setState({ [data.id]: data.value })
  }

  handleClick = async () => {
    const { optOne: optOneText, optTwo: optTwoText } = this.state
    const { authedUser: author, history, resetActiveIndexToZero } = this.props

    if (!optOneText || !optTwoText) {
      this.setState({
        message: {
          hidden: false,
          content: "Please enter both Option One Text and Option Two Text"
        }
      })
      return
    } else {
      this.setState({
        message: {
          hidden: true,
          content: ""
        }
      })
    }
    await this.props.dispatch(handleAddQuestion({
      optOneText,
      optTwoText,
      author
    }))
    resetActiveIndexToZero()
    history.push("/")
  }

  render() {
    const { authedUser, users } = this.props
    const user = users[authedUser]
    const { message } = this.state

    return (
      <div>
        <Card.Group centered>
          <Card style={{ width: "400px" }}>
            <Card.Content>
              <Image floated="left" size="tiny" src={user.avatarURL} />
              <Card.Header>{user.name} asks</Card.Header>
              <div>Would you rather</div>
              <Card.Description>
                <Form>
                  <Form.Field>
                    <Input
                      id="optOne"
                      placeholder="Enter Option One Text Here"
                      value={this.state.optOne}
                      onChange={this.handleOnChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      id="optTwo"
                      placeholder="Enter Option One Text Here"
                      value={this.state.optTwo}
                      onChange={this.handleOnChange}
                    />
                  </Form.Field>
                  <Message hidden={message.hidden} negative>
                    {message.content}
                  </Message>
                </Form>
              </Card.Description>
            </Card.Content>

            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="black" onClick={this.handleClick}>
                  Submit
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { users: state.users, authedUser: state.authedUser }
}

export default connect(
  mapStateToProps
)(NewQuestion)
