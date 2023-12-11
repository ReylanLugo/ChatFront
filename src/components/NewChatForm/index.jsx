import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import socket from "../../helpers/socket";

function NewChatForm({ setToggle }) {
  const [name, setName] = useState("");
  const { user, setMyChats, myChats, chat, setChatSelect } = useContext(UserContext);

  const complete = () => {
    setToggle(false);
    axios
      .post("https://m7dg95vw-5000.use2.devtunnels.ms/api/chats", {
        name,
        user: user,
      })
      .then((res) => {
        setMyChats([...myChats, { _id: Date.now(), name: name }]);
        // Agregamos el cliente al grupo
        socket.emit("changeChat", {
          user,
          chat: name,
          oldChat: chat,
        });
      });
      
    setChatSelect(name);
  };

  return (
    <>
      <div className="h-screen w-screen absolute left-0 top-0 flex justify-center items-center z-20 bg-slate-900/50">
        <div className="bg-slate-800 rounded-md p-4 lg:w-4/12">
          <h3 className="text-2xl mb-4">Crear nuevo chat</h3>
          <p className="mb-2">Ingresa el nombre del nuevo chat:</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="relative block w-full p-3 focus:ring-teal-500 focus:ring-2 focus-visible:outline-0"
          />
          <button className="mt-4 bg-red-600 mr-4" onClick={() => setToggle(false)}>Cancelar</button>
          <button className="mt-4 bg-green-600" onClick={complete}>Crear</button>
        </div>
      </div>
    </>
  );
}

export default NewChatForm;
