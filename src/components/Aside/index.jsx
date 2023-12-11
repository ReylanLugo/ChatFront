import ChatActives from "../ChatActives";
import ChatExplorer from "../ChatExplorer";
import AsideActions from "../AsideActions";
import UserInfo from "../UserInfo";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from "react";

function Aside({ toggleMenu, toggle }) {

  const [mobile, setMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 700);
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const toggleActiveTab = () => {
    toggleMenu(false);
  }
  
  return (
    <>
      <aside className={`lg:w-3/12 max-md:w-4/12 md:w-4/12 ${mobile && toggle ? "absolute sm:w-full sm:h-full max-sm:w-screen max-sm:h-screen max-sm:flex" : "relative"} ${!toggle ? "hidden" : "absolute"} bg-gray-900 flex flex-col z-10`}>
        <span className="absolute mt-3 right-0 p-2 text-2xl hidden max-[700px]:block" onClick={toggleActiveTab}><IoMdArrowRoundBack /></span>
        <UserInfo />
        <div className="overflow-auto flex-1">
          <ChatActives />
          <ChatExplorer />
        </div>
        <AsideActions />
      </aside>
    </>
  );
}

export default Aside;
