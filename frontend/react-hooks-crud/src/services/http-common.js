import axios from "axios";
import authHeader from "./auth-header";

var http = axios.create({
  baseURL: "http://localhost:8080",
  headers: authHeader(),
});

export default http
