const AuthReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGGEDIN":
      let State = true;
      return State;
    case "LOGGEDOUT":
      let data = false;
      return data;
    default:
      return state;
  }
};

export default AuthReducer;
