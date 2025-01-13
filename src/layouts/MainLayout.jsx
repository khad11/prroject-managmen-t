import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import OnlineUsers from "../components/OnlineUsers";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <>
      <div className="flex justify-between bg-slate-300">
        <UserNavbar />
        <main className=" bg-slate-300 w-full p-10">
          <Navbar />
          <Outlet />
        </main>
        <OnlineUsers />
      </div>
    </>
  );
}

export default MainLayout;
