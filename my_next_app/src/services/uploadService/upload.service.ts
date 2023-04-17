import axiosService from "../../../config/axios/axios.config";
import { UPLOAD_URL, UPDATE_AVATAR_URL } from "../urlApi";

const FileUploadService = {
  upload: async (data: { userID: string; file: File }) => {
     const { userID, file } = data;
     
     let formData = new FormData();
   
     formData.append("file", file);
     formData.append("userID", userID);
    
    return axiosService()({
      url: UPLOAD_URL,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData
    })
    
  },

  updateAvatar: async (data: { userID: string; file: File }) => {
    
    const { userID, file } = data;       
         
     let formData = new FormData();
   
     formData.append("file", file);
     formData.append("userID", userID);

    return axiosService()({
      url: UPDATE_AVATAR_URL,
      method: "PATCH",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData
    })
  }
  
};

export default FileUploadService;
