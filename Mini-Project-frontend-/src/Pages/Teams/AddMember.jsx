import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip, message } from "antd";

// Move styled components outside the functional component
const SearchContainer = styled("div")(({ theme }) => ({
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

export default function AddMember() {
  const { teamId } = useParams();
  const [emps, setEmps] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null); // useRef to manage input focus

  useEffect(() => {
    async function getAllEmployees() {
      try {
        const response = await axios.get("https://localhost:7058/api/Employee");
        setEmps(response.data);
      } catch (error) {
        console.log("Error fetching employees:", error);
      }
    }
    getAllEmployees();
  }, []);

  async function handleAdd(empId) {
    try {
      await axios.post(`https://localhost:7058/${teamId}/addEmployee/${empId}`);
      navigate(`/DashLayout/getMembers/${teamId}`);
      message.success("Employee added successfully in Team!");
    } catch (error) {
      console.log("Error adding employee:", error);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function handleNavigateBack() {
    navigate(`/DashLayout/getMembers/${teamId}`);
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = emps.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle focus on input
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <div className="table-container">
        <h1 className="heading">Employees</h1>
        <button className="add-emp" onClick={handleNavigateBack}>
          Back
        </button>
        <br />
        <Toolbar>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchInputChange}
              inputRef={inputRef} // Assign inputRef to manage focus
            />
          </SearchContainer>
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
              .map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.employeeType}</td>
                  <td>
                    <Tooltip title="Add Member">
                      <IconButton
                        color="primary"
                        aria-label="add"
                        onClick={() => handleAdd(emp.id)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="paginator">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={emps.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
