import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import Toast from "../Toast";
import { FiRefreshCcw } from "react-icons/fi";

function UserSettings({ setViewSettings, resultToast }) {
  const { user, userData, setUserData } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [needConfirmPassword, setNeedConfirmPassword] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState(userData.avatar);

  const [toastVisible, setToastVisible] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const changeAvatar = () => {
    setAvatar(`${avatar}${Math.floor(Math.random() * 100)}`);
    setWaiting(true);
    //Esperar 3 segundos para que no puedan saturar la api 
    //y dar chance a que la imagen sea cargada
    setTimeout(() => {
      setWaiting(false);
    }, 3000);
  };

  const confirmPassword = async (e) => {
    setPassword(e.target.value);
    const result = await axios.post("https://m7dg95vw-5000.use2.devtunnels.ms/api/login", {
      username: user,
      password: e.target.value,
    });
    if (result.data.result === user) {
      setNeedConfirmPassword(false);
    } else {
      setNeedConfirmPassword(true);
    }
  };

  const updatedUser = async () => {
    const newUser = {
      username: user,
      password: password,
      avatar: avatar,
      newPassword: newPassword || null,
    };
    const result = await axios.put("https://m7dg95vw-5000.use2.devtunnels.ms/api/user", newUser);
    if (result.data.result === user) {
      setUserData((prev) => {
        return {
          ...prev,
          avatar: newUser.avatar,
        };
      });
      resultToast(true);
      setViewSettings(false);
    } else {
      setToastVisible(true);
    }
  };

  return (
    <>
      <div className="h-screen w-screen absolute flex justify-center items-center z-20 bg-slate-900/50">
        <div className="lg:w-1/4 md:w-2/4 bg-white text-slate-700 p-7 shadow-xl rounded-md max-md:w-full max-md:mx-4">
          <h3 className="text-xl pb-4 border-b-2 border-teal-500">
            User Settings
          </h3>
          <div className="mb-4 mt-4">
            <label className="block">Mi Username:</label>
            <input type="text" value={user} className="p-2 w-full" disabled />
          </div>
          <div className="mb-4">
            <label className="block">Avatar</label>
            <img
              src={avatar}
              alt="profile"
              className="inline-block h-12 w-12 rounded-full mr-2"
            />
            <button
              className="font-bold text-black bg-transparent text-3xl p-0 disabled:text-gray-200"
              onClick={changeAvatar}
              disabled={waiting}
            >
              <FiRefreshCcw />
            </button>
          </div>
          <div className="mb-4 mt-2">
            <label className="block">Confirma tu contraseña</label>
            <input
              type="password"
              className="p-2 text-white w-full"
              value={password}
              onChange={confirmPassword}
            />
            <label className="block mt-2">Nueva contraseña</label>
            <input
              type="password"
              className="p-2 text-white w-full"
              value={newPassword}
              disabled={needConfirmPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-red-500 text-white"
              onClick={() => setViewSettings(false)}
            >
              Cancel
            </button>
            <button className="bg-green-500 text-white" onClick={updatedUser}>
              Save Changes
            </button>
          </div>
        </div>
        {toastVisible && (
          <Toast
            message="Wrong password"
            type="error"
            toggleToast={toastVisible}
            setToggleToast={setToastVisible}
          />
        )}
      </div>
    </>
  );
}

export default UserSettings;
