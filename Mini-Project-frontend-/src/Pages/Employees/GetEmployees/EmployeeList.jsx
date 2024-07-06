import React, { useEffect, useRef, useState } from "react";
import GetEmployee from "./GetEmployees";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TablePagination from "@mui/material/TablePagination";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import ConfirmModal from "./ConfirmModal";
import { message } from "antd";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await GetEmployee();
        setEmployees(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getEmployees();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error fetching employees</p>;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete = (employee) => {
    setSelectedItem(employee);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://localhost:7058/admin/${selectedItem.id}`);
      setEmployees(employees.filter((emp) => emp.id !== selectedItem.id));
      message.success("Employee deleted successfully!");
    } catch (error) {
      console.log("Error deleting employee", error);
    }
    setShowModal(false);
    setSelectedItem(null);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleEdit = (id) => {
    navigate(`/DashLayout/UpdateEmployee/${id}`);
  };

  const filteredData = employees.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <div>
      <div className="container">
        <button
          className="add-emp"
          onClick={() => navigate("/DashLayout/AddEmployee")}
        >
          Add Employee
        </button>
      </div>
      <br />
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputRef={inputRef}
          />
        </Search>
      </Toolbar>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Employee Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((e, index) => (
              <tr key={e.id}>
                <td>{index + 1}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.email}</td>
                <td>{e.department}</td>
                <td>{e.employeeType}</td>
                <td>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(e.id)}
                    aria-label="edit profile"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(e)}
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
      <div className="paginator">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
};

export default EmployeeList;
