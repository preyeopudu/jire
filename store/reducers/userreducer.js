const UserReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGGEDIN":
      let State = [action.user, action.token];
      return State;
    default:
      return state;
  }
};

export default UserReducer;
