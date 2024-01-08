/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { account } from "./appwrite";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
const authContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    checkUser();
  }, []);
  const signInUser = async (info) => {
    setLoading(true);
    try {
      await account.create(
        ID.unique(),
        info.email,
        info.userPassword,
        info.username
      );
      await account.createEmailSession(info.email, info.userPassword);
      const accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.log("Error Comes From Sign In", error);
    }
    setLoading(false);
  };
  const logInUser = async (info) => {
    setLoading(true);
    try {
      const response = await account.createEmailSession(
        info.email,
        info.password
      );
      console.log(response);
      let accountDetails = await account.get();
      setUser(accountDetails);
      navigate("/");
    } catch (error) {
      console.log("Error Comes From Log In User", error);
    }
    setLoading(false);
  };
  const deleteUser = async () => {
    await account.deleteSession("current");
    setUser(null);
  };
  const checkUser = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log("Error Comes From Check User", error);
    }
    setLoading(false);
  };
  return (
    <authContext.Provider value={{ user, signInUser, logInUser, deleteUser }}>
      {loading ? <Loader miniLoading={false} /> : children}
    </authContext.Provider>
  );
};

export const UseAuthContext = () => useContext(authContext);
