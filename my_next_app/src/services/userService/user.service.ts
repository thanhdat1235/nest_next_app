import { RegisterDTO } from "./../../interfaces/register.dto";
import { LoginDataDTO } from "../../interfaces/login.dto";
import axiosService from "../../../config/axios/axios.config";
import axios from "axios";
import { LOGIN_URL, REGISTER_URL, UPDATE_USER_URL } from "../urlApi";

const userService = {
  createUser: async (payload: RegisterDTO) => {
    return axios({
      url: REGISTER_URL,
      method: "POST",
      data: payload,
    });
  },

  signIn: async (payload: LoginDataDTO) => {
    return axios({
      url: LOGIN_URL,
      method: "POST",
      data: payload,
      withCredentials:true
    });
  },

  //   signOut: async (params) => {
  //     return axiosService()({
  //       method: "POST",
  //       url: LOGOUT_URL,
  //       data: params,
  //     });
  //   },

  //   findAll: async (params) => {
  //     return axiosService()({
  //       method: "GET",
  //       url: GET_ALL_URL,
  //       params: {
  //         pageSize: params.pageSize,
  //         page: params.page,
  //       },
  //     });
  //   },

  //   findOne: async (params) => {
  //     return axiosService()({
  //       url: `${GET_ONE_URL}${params.id}`,
  //       method: "GET",
  //     });
  //   },

    updateUser: async (payload: any) => {            
      return axiosService()({
        url: `${UPDATE_USER_URL}${payload.data.id}`,
        method: "PUT",
        data: payload.data,
      });
    },

  //   deleteById: async (params) => {
  //     return axiosService()({
  //       url: `${DELETE_ONE}${params.id}`,
  //       method: "DELETE",
  //       data: params,
  //     });
  //   },

  //   deleteMany: async (params) => {
  //     return axiosService()({
  //       url: DELETE_MANY_URL,
  //       method: "DELETE",
  //       data: params,
  //     });
  //   },

  //   forgotpassword: async (params) => {
  //     return axios({
  //       url: FORGOTPASSWORD_URL,
  //       method: "PUT",
  //       data: params,
  //     });
  //   },

  //   verifyOTP: async (params) => {
  //     return axios({
  //       url: `${VERIFY_OTP_URL}${params.email}`,
  //       method: "POST",
  //       data: { otp_code: params.otp_code.trim() },
  //     });
  //   },

  //   resetpassword: async (params) => {
  //     return axios({
  //       url: `${RESET_PASSWORD_URL}${params.email}`,
  //       method: "POST",
  //       data: { password: params.password.trim() },
  //     });
  //   },
};

export default userService;
