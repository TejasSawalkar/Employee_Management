import "./components/Sidebar/SideBar.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import AdminLogin from "./components/Auth/AdminLogin";

import Dashboard from "./Pages/Dashboard";
import EmployeeList from "./Pages/Employees/GetEmployees/EmployeeList"
import Order from "./Pages/Order";
import Saved from "./Pages/Saved";
import Setting from "./Pages/Setting";
import DashboardLayout from "./Pages/DashboardLayout";
import AddEmployee from "./Pages/Employees/AddEmployee/AddEmployee";
import UpdateEmployee from "./Pages/Employees/UpdateEmployee/UpdateEmployee";
import Teams from "./Pages/Teams/Teams";
import Member from "./Pages/Teams/Member";
import AddMember from "./Pages/Teams/AddMember";
import Project from "./Pages/Project/Project";
import LeaveDetails from "./Pages/Leave/LeaveDetails";
import Profile from "./Pages/Profile/Profile";
import CreateProject from "./Pages/Project/CreateProject";
import ProjectDetails from "./Pages/Project/ProjectDetails";
import AssignTeam from "./Pages/Project/AssignTeam";
import EditProject from "./Pages/Project/EditProject";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />

        <Route path="/DashLayout" element={<DashboardLayout />}>
          <Route path="Dash" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="project" element={<Project />} />
          <Route path="AddEmployee" element={<AddEmployee />} />
          <Route path="UpdateEmployee/:id" element={<UpdateEmployee />} />
          <Route path="teams" element={<Teams />} />
          <Route path="getMembers/:teamId" element={<Member />} />
          <Route path="addMember/:teamId" element={<AddMember />} />
          <Route path="leaveDetails/:reqId/:empId" element={<LeaveDetails />} />
          <Route path="createProject" element={<CreateProject />} />
          <Route path="projectDetails/:projectId" element={<ProjectDetails />} />
          <Route path="editProject/:projectId" element={<EditProject />} />
          <Route path="assignTeam" element={<AssignTeam />} />
        </Route>

        <Route path="*" element={<> not found</>} />
      </Routes>
    </Router>
  );
};

export default App;
