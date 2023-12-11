import { createContext, useState } from "react";
import io from "socket.io-client";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState({
    avatar:"",
  });
  const [chat, setChatSelect] = useState("");
  const [myChats, setMyChats] = useState([]);

  const [messages, setMessages] = useState([
    {
      _id: 1,
      message: "",
      user: "",
    },
  ]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        chat,
        setChatSelect,
        myChats,
        setMyChats,
        messages,
        setMessages,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
