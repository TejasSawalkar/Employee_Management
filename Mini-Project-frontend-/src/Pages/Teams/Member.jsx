import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Teams.css";
import { Tooltip, message } from "antd";

export default function ShowMembers() {
  const { teamId } = useParams();
  const [members, setmembers] = useState([]);
  const navigate = useNavigate();
  const [team, setTeam] = useState("");

  useEffect(() => {
    async function getMembers() {
      try {
        const response = await axios.get(
          `https://localhost:7058/teams/${teamId}/getEmployees`
        );
        setmembers(response.data);
      } catch (error) {
        console.log("Error=", error);
      }
    }
    getMembers();
  }, [teamId]);

  function handleAddMembers() {
    navigate(`/DashLayout/addMember/${teamId}`);
  }

  async function handleDelete(eid) {
    try {
      await axios.delete(
        `https://localhost:7058/${teamId}/deleteEmployee/${eid}`
      );
      setmembers(members.filter((emp) => emp.id != eid));
      message.success("Employee remove successfully from Team!");
    } catch (error) {
      console.log("Error=", error);
    }
  }

  useEffect(() => {
    async function getTeamDetail() {
      try {
        const response = await axios.get(
          `https://localhost:7058/teams/getTeam/${teamId}`
        );
        setTeam(response.data);
      } catch (error) {
        console.log("Error=", error);
      }
    }
    getTeamDetail();
  }, []);

  function ShowTeams() {
    navigate("/DashLayout/teams");
  }

  // function handleEdit(){
  //     navigate(`/EditTeam/${teamId}`);
  // }

  return (
    <div>
      <div className="table-container">
        <div className="heading">
          <h1>{team.teamName}</h1>
          <h2>{team.description}</h2>
        </div>
        <div className="container">
          <button className="back" onClick={ShowTeams}>
            Back
          </button>
          <button className="add-emp" onClick={handleAddMembers}>
            Add Member
          </button>
        </div>
        <br />

        <table className="employee-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, index) => (
              <tr key={m.id}>
                <td>{index + 1}</td>
                <td>{m.firstName}</td>
                <td>{m.lastName}</td>
                <td>{m.email}</td>
                <td>
                  <Tooltip title="Remove">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(m.id)}
                      aria-label="delete profile"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
