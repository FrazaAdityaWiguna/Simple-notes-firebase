export const actionUser = () => (dispatch) => {
  setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "Fraza" });
  }, 2000);
};
