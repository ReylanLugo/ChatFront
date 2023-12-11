import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useState } from "react";
import axios from "axios";
import socket from "../../helpers/socket";
import { FiRefreshCcw } from "react-icons/fi";

function ChatExplorer() {
  const [activeTab, setActiveTab] = useState(false);
  const [chats, setChats] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { myChats, setChatSelect, chat, user, setMyChats } =
    useContext(UserContext);

  useEffect(() => {
    axios.get("https://m7dg95vw-5000.use2.devtunnels.ms/api/chats").then((res) => {
      setChats(res.data.filter((chat) => !chat.users.includes(user)));
    });
  }, [refresh]);

  const toggleActiveTab = () => {
    setActiveTab(!activeTab); // Cambia el estado al contrario del estado actual
  };

  const exploreInChat = (chatE) => {
    setChatSelect(chatE.name);
    axios.post("https://m7dg95vw-5000.use2.devtunnels.ms/api/user/chats", {
      user: user,
      chat: chatE.name,
    }).then((res) => {
      setMyChats([...myChats, { _id: Date.now(), name: chatE.name }]);
      setChats(chats.filter((c) => c.name !== chatE.name));
      setActiveTab(false);
      // Agregamos el cliente al grupo
      socket.emit('changeChat', {
        user,
        chat: chatE.name,
        oldChat: chat
      });
    })
  }

  return (
    <div
      className={`px-4 rounded bg-slate-800 border-t-2 border-slate-700 before:hidden ${
        activeTab ? " pb-4" : ""
      }`}
    >
      <summary className="text-lg list-none py-4 cursor-pointer" onClick={toggleActiveTab}>
        Explorar Chats
        <a className="float-right text-xl font-bold cursor-pointer" onClick={(e) => {e.stopPropagation(); setActiveTab(true); setRefresh(!refresh)}}><FiRefreshCcw /></a>
      </summary>
      {activeTab & (chats.length > 0) ? (
        <ul className="p-4 bg-slate-700 rounded-md mb-4 h-full">
          {chats.map((chat) => (
            <li key={chat._id} onClick={() => exploreInChat(chat)} className="cursor-pointer hover:bg-slate-600 rounded-md p-2 my-1">
              {chat.name}
            </li>
          ))}
        </ul>
      ): null}
      {activeTab & (chats.length === 0) ? (
        <div className="p-4 bg-slate-700 rounded-md text-center h-full">
          No hay chats nuevos
        </div>
      ) : null}
    </div>
  );
}

export default ChatExplorer;
