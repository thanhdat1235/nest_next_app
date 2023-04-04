import jwt from "jsonwebtoken";
export const checkExpToken = (token: string) => {
  try {
    const { exp } = jwt.decode(token) as {
      exp: number;
    };
    const expirationDatetimeInSeconds = exp * 1000;

    return new Date().getTime() / 1000 >= expirationDatetimeInSeconds;
  } catch {
    return true;
  }
};
