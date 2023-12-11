import { UserContext } from "../../context/userContext";
import { useContext } from "react";

function UserInfo() {
    const { user, userData } = useContext(UserContext);
    return ( <>
        <div className="flex items-center p-4 bg-teal-600">
          <img
            src={userData.avatar}
            alt="profile"
            className="inline-block h-8 w-8 rounded-full"
          />
          <h3 className="ml-3 text-xl text-white">{user}</h3>
        </div>
    </> );
}

export default UserInfo;