import React, { Component } from "react";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { loginUserAPI } from "../../../config/redux/action";
import "./Login.scss";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props.loginAPI({ email, password }).catch((err) => err);
    if (res) {
      // console.log("Login success", res);

      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      alert("login failed");
    }
  };

  render() {
    return (
      <div className="container-login">
        <div className="card-login">
          <p className="login-title">Login</p>
          <div className="container-input">
            <input className="input" id="email" type="text" placeholder="Email" onChange={this.handleChangeText} value={this.state.email} />
            <input className="input" id="password" type="password" placeholder="Password" onChange={this.handleChangeText} value={this.state.password} />
          </div>
          <div className="container-btn">
            <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
            <Button onClick={() => this.props.history.push("/Register")} title="Register" loading={this.props.isLoading} />
          </div>
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data, console.log(data, "Login"))),
});

export default connect(reduxState, reduxDispatch)(withRouter(Login));
