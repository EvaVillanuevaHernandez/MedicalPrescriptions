import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  // const encodedPassword = btoa(password);
  // const encodedUsername = btoa(username);
  return axios.post(API_URL + "signup", {
     username,
    //encodedUsername,
    email,
    password,
    //password: encodedPassword,
  });
};

const login = (username, password) => {
  //const encodedPassword = btoa(password);
  //const encodedUsername = btoa(username);

  return axios
    .post(API_URL + "signin", {
      username,
      //username:encodedUsername,
      password,
      //password: encodedPassword,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
