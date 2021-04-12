import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addDataToAPI, getDataFromAPI, updateDataFromAPI } from "../../../config/redux/action";
import "./Dashboard.scss";

export class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Simpan",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNote, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));

    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userid: userData.uid,
    };

    if (textButton === "Simpan") {
      saveNote(data);
    } else {
      data.noteId = noteId;
      console.log("handleSaveNotes-noteId", noteId);
      console.log("data.noteId", data.noteId);
      console.log("data.userid", data.userid);
      updateNotes(data);
    }

    console.log(data);
    this.setState({
      title: "",
      content: "",
      date: "",
    });
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  updateNotes = (note) => {
    console.log("updateNotes", note);
    this.setState({
      title: note.dataChangeArray.title,
      content: note.dataChangeArray.content,
      textButton: "Update",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "Simpan",
    });
  };

  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props;
    const { updateNotes, handleSaveNotes, cancelUpdate } = this;
    // console.log("notes", notes);
    return (
      <div className="dashboard-container">
        <div className="input-container">
          <h2 className="title-input">Masukan Notes</h2>
          <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, "title")} />
          <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, "content")}></textarea>
          <div className="action-wrapper">
            {textButton === "Update" ? (
              <button className="btnSave cancel" onClick={cancelUpdate}>
                {" "}
                Cancel{" "}
              </button>
            ) : null}
            <button className="btnSave" onClick={handleSaveNotes}>
              {" "}
              {textButton}{" "}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div className="notes-card" key={note.id} onClick={() => updateNotes(note)}>
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
  updateNotes: (data) => dispatch(updateDataFromAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
