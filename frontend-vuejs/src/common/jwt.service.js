const ID_TOKEN_KEY = "id_token";
const USER = "user"
export const getToken = () => {
  let user = window.localStorage.getItem(USER)
  let token = window.localStorage.getItem(ID_TOKEN_KEY)
  return {user,token}
};

export const saveToken = (token,user) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
  window.localStorage.setItem(USER, JSON.stringify(user));

};

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
  window.localStorage.removeItem(USER);
};

export default { getToken, saveToken, destroyToken };
