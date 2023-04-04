import axios from "axios";
import { FIND_ALL_USER } from "../urlApi";
import axiosService from "../../../config/axios/axios.config";

const authService = {
    findAllUser: async () => {
        return axiosService()({
            url: FIND_ALL_USER,
            method: "GET",
        })
    }
}

export default authService;