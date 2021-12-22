import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4123/",
  headers: {
    "Content-type": "application/json",
    "x-access-token": localStorage.getItem("x-access-token") || "",
    "x-refresh-token": localStorage.getItem("x-refresh-token") || "",
  },
});
