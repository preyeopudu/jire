export const LogIn = (user, token) => {
  const action = {
    type: "LOGGEDIN",
    user,
    token,
  };
  return action;
};

export const LogOut = () => {
  const action = {
    type: "LOGGEDOUT",
  };
  return action;
};
