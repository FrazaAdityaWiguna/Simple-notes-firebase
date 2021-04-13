import firebase, { database } from "../../firebase";

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        // let user = userCredential.user;
        // ...
        // console.log("Success", user);
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        let dataUser = {
          email: user.email,
          uid: user.uid,
          emailVerif: user.emailVerified,
          refreshToken: user.refreshToken,
        };
        // ...
        console.log("Success", dataUser);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
        console.log(errorCode);
        console.log(errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.userid).push({
    title: data.title,
    content: data.content,
    date: data.resultDate,
  });
};

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = database.ref("notes/" + userId);
  return new Promise((resolve, reject) => {
    urlNotes.on("value", (snapshot) => {
      const data = snapshot.val();
      const dataChangeArray = [];
      Object.keys(data).map((key) => {
        dataChangeArray.push({
          id: key,
          dataChangeArray: data[key],
        });
      });

      dispatch({ type: "SET_NOTES", value: dataChangeArray });
      resolve(data);
    });
  });
};

export const updateDataFromAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`notes/${data.userid}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.set(
      {
        title: data.title,
        content: data.content,
        date: data.resultDate,
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteDataFromAPI = (data) => (dispatch) => {
  const urlNotes = database.ref(`notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    urlNotes.remove();
  });
};
