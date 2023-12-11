import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";
import socket from "../../helpers/socket";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";

function LoginActions({ userPost }) {
  
  const navigate = useNavigate();
  const { setUser, setUserData } = useContext(UserContext);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState("");

  const Login = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/login", userPost);
    if (res.data.result === userPost.username) {
      setUser(res.data.result);
      //TODO: colocar mas datos del usuario, como podria ser direcciones, correos y demas
      setUserData((state) => {
        return {
          ...state,
          avatar: res.data.info.avatar,
        };
      });
      // si estamos desconectados, volvemos a conectar
      !socket.connected && socket.connect();
      socket.emit("addUser", res.data.result, "");
      navigate("/chat");
    } else {
      setMessage(res.data.result);
      setToast(true);
    }
  };

  const Register = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/user", userPost);
    if (res.data.result === userPost.username) {
      setUser(res.data.result);
      //TODO: colocar mas datos del usuario, como podria ser direcciones, correos y demas
      setUserData((state) => {
        return {
          ...state,
          avatar: res.data.info.avatar,
        };
      });
      navigate("/chat");
    } else {
      setMessage(res.data.result);
      setToast(true);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <button className="bg-blue-500" onClick={Login}>
          Login
        </button>
        <button className="bg-green-500 ml-4" onClick={Register}>
          Register
        </button>
      </div>
      {toast && (
        <Toast
          message={message}
          type="error"
          toggleToast={toast}
          setToggleToast={setToast}
        />
      )}
    </>
  );
}

export default LoginActions;
