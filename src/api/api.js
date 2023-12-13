import axios from "axios";

let instance = axios.create({
  baseURL: "https://tk.uat.sibcode.team/api/",
  timeout: 10000,
  validateStatus: function (status) {
    return status < 500;
  },
});

export default instance;
