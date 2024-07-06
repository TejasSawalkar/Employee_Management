import React from "react";
import SideBar from "../components/Sidebar/SideBar";
import { Outlet } from "react-router-dom";

import NavBar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <SideBar></SideBar>
      <div className="dashboard-content">
        <NavBar></NavBar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
