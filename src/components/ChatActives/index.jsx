import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import socket from "../../helpers/socket";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function ChatActives() {
  const { myChats, setChatSelect, chat, user, setMyChats } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(true);

  useEffect(() => {
    setActiveTab(true);
    axios.get("https://m7dg95vw-5000.use2.devtunnels.ms/api/chats").then((res) => {
      setMyChats(res.data.filter((chat) => chat.users.includes(user)));
    })
  }, []);

  const toggleActiveTab = () => {
    setActiveTab(!activeTab); // Cambia el estado al contrario del estado actual
  };

  const addChat = (e) => {
    e.stopPropagation();
    const name = prompt("Name");
    if (!name) return;
    // setChats((state) => [...state, { _id: Date.now(), name: name}]);
    axios
      .post("https://m7dg95vw-5000.use2.devtunnels.ms/api/chats", { name, user: user })
      .then((res) => {
        setMyChats([...myChats, { _id: Date.now(), name: name }]);
        // Agregamos el cliente al grupo
        socket.emit('changeChat', {
          user,
          chat: name,
          oldChat: chat
        });
      });
      
    setChatSelect(name);
    
  };


  const removeChat = (e, name) => {
    e.stopPropagation();
    axios.put('https://m7dg95vw-5000.use2.devtunnels.ms/api/user/chats', {
      name,
      user: user
    }).then((res) => {
      // Avisa al servidor que se elimino el chat
      socket.emit('changeChat', {
        user,
        chat: '',	
        oldChat: name
      });
      setMyChats(myChats.filter((chat) => chat.name !== name));
      if (name === chat) {
        setChatSelect('');
      }
    })
  }

  const selectChat = (newchat) => {
    if (chat === newchat) return;
    socket.emit('changeChat', {
      user,
      chat: newchat,
      oldChat: chat
    });
    setChatSelect(newchat);
  }

  return (
    <div
      className={`px-4 rounded bg-slate-800 before:hidden ${
        activeTab  ? " pb-4" : ""
      }`}
      
    >
      <summary className="text-lg list-none py-4 cursor-pointer" onClick={toggleActiveTab}>
        Chats Activos <a className="float-right text-xl font-bold cursor-pointer" onClick={addChat}><IoMdAddCircleOutline /></a>
      </summary>
      {myChats.length === 0 && activeTab ? (
        <div className="p-4 bg-slate-700 rounded-md text-center h-full">
          No tienes chats activos
        </div>
      ): null}
      {activeTab & (myChats.length > 0) ? (
        <ul className="p-4 bg-slate-700 rounded-md mb-4 h-full">
          {myChats?.map((chatb) => (
            <li
              key={chatb._id}
              onClick={() => selectChat(chatb.name)}
              className={
                "cursor-pointer hover:bg-slate-600 rounded-md p-2 my-1" +
                (chatb.name === chat ? " bg-slate-600" : "")
              }
            >
              {chatb.name} <a className="float-right text-red-500 font-bold cursor-pointer" onClick={(e) => removeChat(e, chatb.name)} ><MdDelete /></a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default ChatActives;
