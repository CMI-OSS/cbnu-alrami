import axios from "axios";

export default axios.create({
  baseURL: "https://dev-server.cmi.kro.kr",
  headers: {
    "Content-type": "application/json",
  },
});
