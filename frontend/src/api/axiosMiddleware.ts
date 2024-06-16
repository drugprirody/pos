import axios from "axios";

import { CLIENT_API } from "./index";

const instance = axios.create({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: CLIENT_API,
});

export default instance;
