import { useState, useEffect, FC } from "react";
import UploadService from "../services/uploadService/upload.service";

export type IProps = {
  userId: string;
  avatar: {
    id: string,
    userID: string,
    avatar_link: string
  };
  setLink: (avatar: {
    id: string,
    userID: string,
    avatar_link: string
  }) => any
};

const FileUpload = (props: IProps) => {
  const [message, setMessage] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  useEffect(() => {
    if (props.avatar) {
      setAvatar(props.avatar.avatar_link);
    }
  }, []);

  const selectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const userID = props.userId;    

    try {
      if (file) {        
        if (!avatar) {
          const imgRes = await UploadService.upload({ userID, file });
          setAvatar(imgRes.data.avatar_link);
          props.setLink(imgRes.data)
        } else {                    
          const imgRes = await UploadService.updateAvatar({ userID, file });
          setAvatar(imgRes.data.avatar_link);
        }
      }
      // setMessage(imgRes.data.message);
    } catch (error) {
      setMessage("Could not upload the File!");
    }
  };

  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your avatar
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={(event) => selectFile(event)}
          placeholder="Choose your avatar"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        {avatar ? (
          <img
            className="border rounded-sm border-gray-50 mt-5 w-[200px]"
            src={avatar}
          />
        ) : null}
      </div>

      {message && (
        <div className="alert alert-secondary mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
