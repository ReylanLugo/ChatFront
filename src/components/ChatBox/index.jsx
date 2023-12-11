import { useEffect, useRef, useContext } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import socket from "../../helpers/socket";
import { MdDelete } from "react-icons/md";

function ChatBox() {
  const chatbox = useRef(null);
  const { user, chat, messages, setMessages } = useContext(UserContext);

  useEffect(() => {
    const receiveMessage = (message) =>
      setMessages((state) => [...state, message]);

    const deleteMessage = (id) => 
      setMessages((state) => state.filter((message) => message.message !== id));

    socket.on("message", receiveMessage);

    socket.on("onDeleteMessage", (id) => {
      axios
      .post("http://localhost:5000/api/messages", { chat: chat })
      .then((res) => {
        if (JSON.stringify(messages) !== JSON.stringify(res.data)) {
          //Usamos el JSON.stringify para comparar el estado ya que si comparo un array solo se compara la referencia en memoria
          setMessages(res.data);
          // //Refiltramos el mensaje eliminado
          // setMessages((state) => state.filter((message) => message._id !== id));
        }
      })
    });

    axios
      .post("http://localhost:5000/api/messages", { chat: chat })
      .then((res) => {
        if (JSON.stringify(messages) !== JSON.stringify(res.data)) {
          //Usamos el JSON.stringify para comparar el estado ya que si comparo un array solo se compara la referencia en memoria
          setMessages(res.data);
        }
      })
      .finally(() => {
        if (chatbox.current) {
          chatbox.current.scrollTo({
            top: chatbox.current.scrollHeight,
            behavior: "smooth",
          });
        }
      });

    return () => {
      socket.off("message", receiveMessage);
      socket.off("onDeleteMessage", deleteMessage);
    };
  }, [chat, messages, setMessages]);

  const deleteMessage = (body) => {
    console.log(body);
    socket.emit("onDeleteMessage", { id: body._id, chat: chat });
    const newchat = messages.filter((message) => message._id !== body._id);
    setMessages(newchat);
    // axios.put("http://localhost:5000/api/messages", { id: id });
    // setMessages((state) => state.filter((message) => message._id !== id));
    // console.log("Message deleted " + messages.length);
  };

  return (
    <>
      <div
        className="flex flex-col relative bg-slate-300 p-3 flex-1 overflow-auto"
        id="chatbox"
        ref={chatbox}
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <label
              key={message._id}
              className={`shadow-md rounded px-4 py-2 mb-4 min-w-[100px] text-black w-fit ${
                message.user === user
                  ? "ml-auto bg-teal-800 text-white"
                  : "bg-slate-900 text-white"
              }`}
            >
              {message.user !== user ? (
                <span className="font-bold block">{message.user}:</span>
              ) : (
                <>
                  <span
                    className="font-bold absolute text-left cursor-pointer"
                    onClick={() => {
                      deleteMessage(message);
                    }}
                  >
                    <MdDelete />
                  </span>
                  <span className="font-bold block text-right">Yo</span>
                </>
              )}
              {message.message}
            </label>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <label className="rounded px-8 py-2 mb-4 text-black text-center text-2xl w-full">
              No hay mensajes
            </label>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatBox;
