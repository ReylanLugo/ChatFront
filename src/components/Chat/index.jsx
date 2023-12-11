import { useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import Aside from "../Aside";
import ChatBox from "../ChatBox";
import ChatHead from "../ChatHead";
import ChatActions from "../ChatActions";

function Chat() {
  const [viewMenu, setViewMenu] = useState(true);
  const {
    chat,
  } = useContext(UserContext);

  useEffect(() => {
    setViewMenu(window.innerWidth > 768 ? true : false);

    const handleResize = () => {
      setViewMenu(window.innerWidth > 700 ? true : false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  //{userInChat?.map((user) => user.userId)} para ver los usuarios activos

  const changeMenuView = () => {
    setViewMenu(true);
  };

  return (
    <>
      <div className="h-screen w-full flex">
        {viewMenu && <Aside toggleMenu={setViewMenu} toggle={viewMenu} />}
        <div className="lg:w-9/12 max-md:w-8/12 md:w-8/12 max-[700px]:w-screen max-sm:w-full h-full flex flex-col">
          <ChatHead changeMenuView={changeMenuView} />
          {chat !== "" ? (
            <ChatBox />
          ) : (
            <div className="flex justify-center items-center h-full">
              Selecciona un chat
            </div>
          )}
          <ChatActions />
        </div>
      </div>
    </>
  );
}

export default Chat;
