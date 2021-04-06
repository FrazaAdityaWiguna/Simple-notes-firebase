import firebase from "../../firebase";

export const registerUserAPI = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  return firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log("user", user);
      dispatch({ type: "CHANGE_LOADING", value: false });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
      console.log(errorCode);
      console.log(errorMessage);
      dispatch({ type: "CHANGE_LOADING", value: false });
    });
};
