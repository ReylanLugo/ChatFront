import { useState } from "react";
import LoginActions from "../LoginActions";

function Login() {

  const [userPost, setUserpost] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-900 ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/4">
          <h1 className="text-2xl font-bold mb-4 text-slate-800">LOGIN</h1>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="mb-4 border border-gray-300 rounded px-3 py-2 block w-full"
            onChange={(e) =>
              setUserpost({ ...userPost, username: e.target.value })
            }
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="mb-4 border border-gray-300 rounded px-3 py-2 block w-full"
            onChange={(e) =>
              setUserpost({ ...userPost, password: e.target.value })
            }
          />
          <LoginActions userPost={userPost} />
        </form>
      </div>
    </>
  );
}

export default Login;
