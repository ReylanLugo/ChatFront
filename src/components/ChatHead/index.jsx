import { useContext, useState, useEffect } from "react";
import { RiMenuFill } from "react-icons/ri";
import UserActives from "../UserActives";
import { UserContext } from "../../context/userContext";
import socket from "../../helpers/socket";

function ChatHead(props) {
    const { chat, user} = useContext(UserContext);

    const [userInChat, setUserInChat] = useState([]);
    const [toggleUserActives, setToggleUserActives] = useState(false);

    useEffect(() => {
        socket.on("activeUsers", (users) => {
            console.info("activeUsers event received:", users);
            setUserInChat(users);
          });
      
          socket.on("inactiveUser", (userId) => {
            console.info("inactiveUser event received:", userId);
            setUserInChat((prevUsers) =>
              prevUsers.filter((user) => user.userId !== userId)
            );
          });

          return () => {
            socket.off("activeUsers");
            socket.off("inactiveUser");
          }
    }, []);

    return ( <>
        <h1 className="text-2xl font-bold text-slate-100 p-4 bg-teal-700 flex items-center">
            <a
              className="font-bold mr-4 hidden max-[700px]:inline"
              onClick={props.changeMenuView}
            >
              <RiMenuFill />
            </a>
            {chat !== "" ? (
              <>
                {chat}
                <span className="text-sm font-normal ml-2 bg-teal-500 p-1 rounded-lg" onClick={() => setToggleUserActives(!toggleUserActives)}>
                  {userInChat.length} usuarios dentro
                  {toggleUserActives ? (
                    <UserActives userList={userInChat} />
                  ): (
                    null
                  )}
                </span>
              </>
            ) : (
              <>Bienvenido {user}</>
            )}
          </h1>
    </> );
}

export default ChatHead;