import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person"; 
import TablePagination from "@mui/material/TablePagination";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Tooltip, message } from "antd";

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function getTeams() {
      try {
        const response = await axios.get(
          "https://localhost:7058/teams/getTeams"
        );
        setTeams(response.data);
      } catch (error) {
        console.log("Error=", error);
      }
    }
    getTeams();
  }, []);

  function handleShowMembers(teamId) {
    navigate(`/DashLayout/getMembers/${teamId}`);
  }

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setTeamName(team.teamName);
    setTeamDescription(team.description);
    setShowEditModal(true);
  };

  const handleDelete = (team) => {
    setSelectedTeam(team);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://localhost:7058/deleteTeam/${selectedTeam.teamId}`
      );
      setTeams(teams.filter((t) => t.teamId !== selectedTeam.teamId));
      setShowDeleteModal(false);
      setSelectedTeam(null);
      message.success("Team deleted successfully!");
    } catch (error) {
      console.log("Error deleting team:", error);
    }
  };

  const confirmEdit = async () => {
    try {
      const updatedTeam = {
        ...selectedTeam,
        teamName: teamName,
        description: teamDescription,
      };
      await axios.put(
        `https://localhost:7058/updateTeam/${selectedTeam.teamId}`,
        updatedTeam
      );
      setTeams(
        teams.map((t) => (t.teamId === selectedTeam.teamId ? updatedTeam : t))
      );
      setShowEditModal(false);
      setSelectedTeam(null);
      message.success("Team updated successfully!");
    } catch (error) {
      console.log("Error updating team:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const newTeam = {
        teamName: newTeamName,
        description: newTeamDescription,
      };
      const response = await axios.post(
        "https://localhost:7058/createTeam",
        newTeam
      );
      setTeams([...teams, response.data]);
      setShowAddModal(false);
      setNewTeamName("");
      setNewTeamDescription("");
      message.success("Team added successfully!");
    } catch (error) {
      console.log("Error adding team:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="table-container">
        <div className="container">
          <button className="add-emp" onClick={() => setShowAddModal(true)}>
            Add Teams
          </button>
        </div>
        <br />

        <table className="employee-table">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Add Members</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teams
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((t, index) => (
                <tr key={t.teamId}>
                  <td>{index + 1 + page * rowsPerPage}</td>
                  <td>{t.teamName}</td>
                  <td>{t.description}</td>
                  <td>
                    <Tooltip title="View Members">
                      <IconButton
                        color="primary"
                        onClick={() => handleShowMembers(t.teamId)}
                        aria-label="show members"
                      >
                        <PersonIcon />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(t)}
                      aria-label="edit profile"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(t)}
                      aria-label="delete profile"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="paginator">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={teams.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>

      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete the team "{selectedTeam?.teamName}"?
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={confirmDelete}
              sx={{ ml: 2 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit Team
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={confirmEdit}
                sx={{ ml: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="add-modal-title" variant="h6" component="h2">
            Add Team
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Team Name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={newTeamDescription}
              onChange={(e) => setNewTeamDescription(e.target.value)}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
                sx={{ ml: 2 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
