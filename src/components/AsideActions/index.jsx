import { UserContext } from "../../context/userContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSettings from "../UserSettings";
import Toast from "../Toast";
import socket from "../../helpers/socket";
import { SlLogout } from "react-icons/sl";
import { IoSettings } from "react-icons/io5";


function AsideActions() {

  const [viewSettings, setViewSettings] = useState(false);
  const [toggleToast, setToggleToast] = useState(false);

    const navigate = useNavigate();
    const { setUser, setChatSelect, setMyChats, setUserData } = useContext(UserContext);

    const Logout = () => {
        setUser('');
        setChatSelect('');
        setMyChats([]);
        setUserData({});
        socket.disconnect();
        navigate('/');
    }


  return (
    <>
      <div
        className="h-14 bg-slate-950 flex items-center p-3 justify-between w-full"
        style={{ alignSelf: "flex-end" }}
      >
        <a className="text-white flex text-xl items-center" onClick={Logout}><SlLogout className="mr-2" /></a>
        <a className="text-white text-xl" onClick={() => setViewSettings(!viewSettings)}><IoSettings /></a>
      </div>
      {toggleToast && (
        <Toast message="User updated" type="success" toggleToast={toggleToast} setToggleToast={setToggleToast} />
      )}
      {viewSettings && <UserSettings setViewSettings={setViewSettings} resultToast={setToggleToast} />}
    </>
  );
}

export default AsideActions;
