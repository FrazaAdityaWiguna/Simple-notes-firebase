import React, { Component } from "react";
import "./Register.scss";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

class Register extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;
    const res = await this.props.registerAPI({ email, password }).catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
    } else {
      alert("Register Failed");
    }
  };

  render() {
    return (
      <div className="container-auth">
        <div className="auth-card">
          <p className="auth-title">Register</p>
          <div className="container-input">
            <input className="input" id="email" type="text" placeholder="Email" onChange={this.handleChangeText} value={this.state.email} />
            <input className="input" id="password" type="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password} />
          </div>
          <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
          {/* <button>Go to Dashboard</button> */}
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);