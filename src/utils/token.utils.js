import { jwtDecode } from "jwt-decode";
import { SessionStorage, useQuasar } from "quasar";

const $q = useQuasar();

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
  return SessionStorage.getItem("token");
};

const setToken = (token) => {
  try {
    SessionStorage.setItem("token", token);
  } catch (e) {
    $q.notify({
      message: "Failed to authorize user. Please try again.",
      type: "negative",
    });
  }
};

const removeToken = () => {
  SessionStorage.remove("token");
};

export {
  checkTokenExpiration,
  isAuthenticated,
  getToken,
  setToken,
  removeToken,
};
