import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import socket from "../../helpers/socket";

function ChatActions() {
  const { user, chat, setMessages } = useContext(UserContext);
  const [msg, setMsg] = useState("");

  const sendMessage = () => {
    if (!msg) return;
    socket.emit("message", { message: msg, user: user, chat: chat });
    // Actualizar el estado 'messages' con el mensaje enviado
    const newMessage = { _id: Date.now(), message: msg, user: user }; // Crear un objeto de mensaje con un ID único
    setMessages((prevState) => [...prevState, newMessage]); // Agregar el mensaje al estado 'messages'
    setMsg("");
  };

  return (
    <>
      <div className="flex">
        <input
          type="text"
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          value={msg}
          className="relative bottom-0 block w-full px-3 bg-slate-900 focus:ring-teal-500 focus:ring-2 focus-visible:outline-0"
          placeholder="Escribe tu mensaje..."
          disabled={chat === ""}
        />
        <button onClick={sendMessage} className="bg-teal-900 rounded-none">
          Enviar
        </button>
      </div>
    </>
  );
}

export default ChatActions;
