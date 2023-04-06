import axios from "axios";
import { FIND_ACTIVE_USER } from "../urlApi";
import axiosService from "../../../config/axios/axios.config";

const authService = {
    findActiveUser: async () => {
        return axiosService()({
            url: FIND_ACTIVE_USER,
            method: "GET",
        })
    }
}

export default authService;