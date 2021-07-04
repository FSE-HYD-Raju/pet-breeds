import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { connect } from 'react-redux'
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  render() {
    const { userName, password } = this.state;
    const validateForm = () => {
      return userName.length > 0 && password.length > 0;
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          userName: this.state.userName,
          password: this.state.password,
        }
      });
      this.props.history.push("/dashboard");
    };

    const handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };

    return (
      <div className="Login">
        <h2 className="heading">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="userName">
            <Form.Label>userName</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={userName}
              name="userName"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Button
            className="login-btn"
            block
            size="lg"
            type="submit"
            disabled={!validateForm()}
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect()(Login);
