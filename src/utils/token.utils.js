import { jwtDecode } from "jwt-decode";
import { LocalStorage, SessionStorage } from "quasar";

const checkTokenExpiration = (token) => {
  const decoded = jwtDecode(token);
  const expirationDate = new Date(decoded.exp * 1000);

  return expirationDate < new Date();
};

const isAuthenticated = () => {
  const token = getToken();
  return token && !checkTokenExpiration(token);
};

const getToken = () => {
  return LocalStorage.getKey("token") || SessionStorage.getKey("token");
};

const setToken = (token) => {
  try {
    LocalStorage.set("token", token);
    SessionStorage.set("token", token);
  } catch (e) {
    $q.notify({
      message: "Failed to save token",
      type: "negative",
    });
  }
};

const removeToken = () => {
  LocalStorage.remove("token");
  SessionStorage.remove("token");
};

export {
  checkTokenExpiration,
  isAuthenticated,
  getToken,
  setToken,
  removeToken,
};
