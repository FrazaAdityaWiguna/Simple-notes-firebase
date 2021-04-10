import React, { Component } from "react";
import { connect } from "react-redux";
import { addDataToAPI } from "../../../config/redux/action";
import "./Dashboard.scss";

export class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
  };

  componentDidMount() {
    const userdata = localStorage.getItem("userData");
    console.log("dashboard", JSON.parse(userdata));
  }

  handleSaveNotes = () => {
    const { title, content } = this.state;
    const { saveNote } = this.props;

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userid: this.props.userData.uid,
    };

    saveNote(data);
    console.log(data);
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  render() {
    const { title, content } = this.state;
    return (
      <div className="dashboard-container">
        <div className="input-container">
          <h2 className="title-input">Masukan Notes</h2>
          <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, "title")} />
          <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, "content")}></textarea>
          <button className="btnSave" onClick={this.handleSaveNotes}>
            Save
          </button>
        </div>
        <hr />
        <div className="notes-card">
          <p className="notes-title">Title</p>
          <p className="notes-date">22 Feb 2021</p>
          <p className="notes-content">Content Notes</p>
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
});

const reduxDispatch = (dispatch) => ({
  saveNote: (data) => dispatch(addDataToAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
