export const LogIn = (user) => {
  const action = {
    type: "LOGGEDIN",
    user,
  };
  return action;
};

export const LogOut = () => {
  const action = {
    type: "LOGGEDOUT",
  };
  return action;
};
