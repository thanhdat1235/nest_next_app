import { REFRESH_TOKEN_URL } from "../src/services/urlApi";
import axios from "axios";
const refreshToken = async (refresh_token: string | null) => {
  try {
    const newToken = await axios.post(REFRESH_TOKEN_URL, {
      refresh_token: refresh_token,
    });
    localStorage.setItem("token", newToken.data);
    return newToken;
  } catch (error) {
    console.log(error);
  }
};

export default refreshToken;
