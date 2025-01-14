import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import OnlineUsers from "../components/OnlineUsers";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <div className="flex justify-between ">
        <UserNavbar />
        <main className=" bg-base-100 w-full p-10">
          <Navbar />
          <Outlet />
        </main>
        <OnlineUsers />
      </div>
    </>
  );
}

export default MainLayout;
