import axios from "axios";
import { API_URL } from "../../src/services/urlApi";
import { checkExpToken } from "../../utils/checkExpToken";
import refreshToken from "../../utils/refreshToken";
import Cookies from "js-cookie";

const axiosOptions = axios.create({
  baseURL: API_URL,
  timeout: 3 * 1000,
});

const axiosService = () => {
  // const token = localStorage.getItem("token");
  // if (!token) {
  //   window.location.replace("/login");
  //   return;
  // }
  // Truoc khi gui server
  axiosOptions.interceptors.request.use(
    async (config) => {
      config.withCredentials = true;
      // if (token) {

      // }
      // if (!checkExpToken(token)) {
        // refresh token
        // const refresh_token = Cookies.get('Refresh');
        // console.log(refreshToken);
        
        // const res = await refreshToken(refresh_token);
        // if (res) {
        //   config.headers = {
        //     "content-type": "application/json",
        //     authorization: res.data,
        //   };
        // }
      // }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  // Sau khi gui server
  axiosOptions.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return axiosOptions;
};

export default axiosService;
