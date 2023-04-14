import React, { useEffect, useState } from "react";
import FileUpload from "../FileUpload";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import userService from "../../services/userService/user.service";
import { setUserLogin } from "../../redux/userSlice";

export type IProps = {
  showModal: Boolean;
  toggleModal: (toggle: Boolean) => any;
};

interface IGetUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  published: string;
  avatar: {
    id: string;
    userID: string;
    avatar_link: string;
  };
  createdAt: string;
  updatedAt: string;
  refresh_token: string;
}

const ProfileModal = (props: IProps) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<IGetUser>();
  const showModal = props.showModal;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const getUser = useSelector((state: RootState) => state.userIsLogin);
  useEffect(() => {
    reset(getUser);
    setUser(getUser);
  }, []);

  const setAvatarParent = (avatar: {id: string, userID: string, avatar_link: string}): any => {
    if (user) {
      user.avatar.avatar_link = avatar.avatar_link;
    }
    dispatch(setUserLogin(user));
  };

  const setStyleValidate = (name: string) =>
    errors[name as keyof typeof errors] ? { border: "1px solid red" } : {};

  const onSubmit = async (data: any) => {
    try {
      const userUpdate = await userService.updateUser({
        data,
      });

      dispatch(setUserLogin(userUpdate.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {showModal ? (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full"
        >
          <div className="relative flex justify-center items-center w-full h-full">
            <div className="w-full h-full bg-black opacity-50"></div>
            <div className="w-full max-w-4xl max-h-full absolute">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={() => props.toggleModal(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="px-6 py-6 lg:px-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                    Edit your profile
                  </h3>
                  <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your username
                      </label>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Jonh Rich"
                        style={setStyleValidate("username")}
                        {...register("username", {
                          required: true,
                        })}
                        id="username"
                        name="username"
                      />
                      {errors.username?.type === "required" && (
                        <span className="text-red-500">
                          Vui lòng nhập username
                        </span>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        style={setStyleValidate("email")}
                        {...register("email", {
                          required: true,
                        })}
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                      />
                      {errors.username?.type === "required" && (
                        <span className="text-red-500">
                          Vui lòng nhập email
                        </span>
                      )}
                    </div>
                    <FileUpload
                      userId={getUser.id}
                      avatar={getUser.avatar}
                      setLink={(avatar: {id: string, userID: string, avatar_link: string}) => setAvatarParent(avatar)}
                    />
                    <div className="flex justify-between">
                      <a
                        href="#"
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Lost Password?
                      </a>
                    </div>
                    <div className="w-full">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Update your profile
                      </button>
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?{" "}
                      <a
                        href="#"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Create account
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProfileModal;
