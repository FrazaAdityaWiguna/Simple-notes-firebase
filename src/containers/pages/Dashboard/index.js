import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addDataToAPI, getDataFromAPI } from "../../../config/redux/action";
import "./Dashboard.scss";

export class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content } = this.state;
    const { saveNote } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userid: userData.uid,
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
    const { notes } = this.props;
    console.log("notes", notes);
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
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div className="notes-card" key={note.id}>
                  <p className="notes-title">{note.dataChangeArray.title}</p>
                  <p className="notes-date">{note.dataChangeArray.date}</p>
                  <p className="notes-content">{note.dataChangeArray.content}</p>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNote: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
