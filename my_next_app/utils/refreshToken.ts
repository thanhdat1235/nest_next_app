import { REFRESH_TOKEN_URL } from "../src/services/urlApi";
import axios from "axios";
const refreshToken = async (refresh_token: string | null) => {
  try {
    const newAccessToken = await axios.post(REFRESH_TOKEN_URL, {
      refresh_token: refresh_token,
    });
    localStorage.setItem("token", newAccessToken.data);
    return newAccessToken;
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
