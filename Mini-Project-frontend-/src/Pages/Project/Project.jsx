import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { message } from "antd";
import ConfirmModal from "./ConfirmModal";

export default function ShowProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function getProjects() {
      try {
        const response = await axios.get("https://localhost:7058/getProjects");
        setProjects(response.data);
      } catch (error) {
        console.log("error=", error);
      }
    }
    getProjects();
  }, []);

  const handleDelete = (project) => {
    setSelectedItem(project);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `https://localhost:7058/deleteProject/${selectedItem.projectId}`
      );
      setProjects(
        projects.filter((project) => project.id !== selectedItem.projectId)
      );
      message.success("Project deleted successfully!");
      setProjects(
        projects.filter(p => p.projectId !== selectedItem.projectId)
      );
    } catch (error) {
      console.log("Error deleting Project", error);
    }
    setShowModal(false);
    setSelectedItem(null);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleShow = (project) => {
    navigate(`/DashLayout/projectDetails/${project.projectId}`)
  }

  const handleEdit = (project) => {
    navigate(`/DashLayout/editProject/${project.projectId}`)
  }

  return (
    <div>
      <div className="container">
        <button
          className="add-emp"
          onClick={() => navigate("/DashLayout/createProject")}
        >
          Add Project
        </button>
      </div>
      <br />
      <table className="employee-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.projectId}>
              <td>{index + 1}</td>
              <td>{project.projectName}</td>
              <td>{project.description}</td>
              <td>{project.dueDate}</td>
              <td>{project.status}</td>
              <td>
                <IconButton
                  color="primary"
                  onClick={() => handleShow(project)}
                  aria-label="show profile"
                >
                  <VisibilityIcon />
                </IconButton>
                {/* <Link to={`/project/${project.projectId}`}>Show Details</Link> */}
              </td>
              <td>
                {/* <Link to={`/editProject/${project.projectId}`}>Edit</Link> */}
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(project)}
                  aria-label="edit profile"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(project)}
                  aria-label="delete profile"
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmModal
        show={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
