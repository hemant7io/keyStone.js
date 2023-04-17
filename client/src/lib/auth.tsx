import { useState, createContext } from "react";

export const Auth = createContext({
  user: "adsfasd",
  SignUp: (user: any) => {},
  logoutUser: () => {},
});

const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState("");
  const SignUp = (value: any) => {
    setUser(value);
  };
  const logoutUser = () => {
    setUser("");
  };
  const value = {
    user: user,
    SignUp: SignUp,
    logoutUser: logoutUser,
  };
  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthContextProvider;
