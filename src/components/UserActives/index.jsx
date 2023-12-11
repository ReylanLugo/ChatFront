import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";

function UserActives({ userList }) {
  const [usersInfo, setUsersInfo] = useState(null);
  const { chat } = useContext(UserContext);

  useEffect(() => {
    axios.get(`https://m7dg95vw-5000.use2.devtunnels.ms/api/chats/${chat}/users`).then((res) => {
      setUsersInfo(JSON.parse(res.data));
      console.log(JSON.parse(res.data) + "usersInfo");
      console.log(userList + " userList");
    });
  }, [userList]);
  return (
    <>
      <div className="absolute z-20 h-screen w-screen bg-slate-700/50 flex justify-center items-center left-0 top-0">
        <div className="lg:w-1/4 md:w-2/4 bg-white text-slate-700 p-7 rounded-md max-md:w-full max-md:mx-4">
          <h3 className="text-xl pb-4 border-b-2 border-teal-500 mb-4">
            Conectados
          </h3>
          <ul>
            {usersInfo?.map((user) => (
              <li className="py-2" key={user.username}>
                <img src={user.avatar} alt={user.username} className="inline-block h-8 w-8 rounded-full mr-2" />
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default UserActives;
