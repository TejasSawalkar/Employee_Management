import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Typography,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  message,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";

const { Option } = Select;

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    dateOfJoining: "",
    employeeType: "",
    role: "",
  });

  const departments = [
    "HR",
    "IT",
    "Finance",
    "Marketing",
    "Sales",
    "Admin",
    "BusinessDevelopment",
    "Security",
    "Development",
  ];

  const employeeTypes = [
    "Fulltime",
    "Parttime",
    "Temporary",
    "Seasonal",
    "Leased",
    "Intern",
  ];

  const roles = ["Admin", "User", "Viewer"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, dateString) => {
    setformData({
      ...formData,
      dateOfJoining: dateString,
    });
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://localhost:7058/admin/addEmployee",
        values
      );
      console.log("Employee Added Successfully", response.data);
      message.success("Employee added successfully!");
      navigate("/DashLayout/employees");
    } catch (error) {
      console.log("Error adding Employee", error);
      message.error("Failed to add employee");
    }
  };

  return (
    <div className="admin">
      <Card className="form-container1">
        <Typography.Title level={3} strong className="title">
          Add Employee
        </Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          initialValues={formData}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name!",
                  },
                ]}
              >
                <Input
                  size="medium"
                  placeholder="Enter your first name"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Middle Name"
                name="middleName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your middle name!",
                  },
                ]}
              >
                <Input
                  size="medium"
                  placeholder="Enter your middle name"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your last name!",
                  },
                ]}
              >
                <Input
                  size="medium"
                  placeholder="Enter your last name"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
              >
                <Input
                  size="medium"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="medium"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Department"
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Please select your department!",
                  },
                ]}
              >
                <Select
                  size="medium"
                  placeholder="Select your department"
                  onChange={(value) => handleSelectChange("department", value)}
                >
                  {departments.map((department) => (
                    <Option key={department} value={department}>
                      {department}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date of Joining"
                name="dateOfJoining"
                rules={[
                  {
                    required: true,
                    message: "Please select the date of joining!",
                  },
                ]}
              >
                <DatePicker
                  size="medium"
                  name="dateOfJoining"
                  style={{ width: "100%" }}
                  onChange={handleDateChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Employee Type"
                name="employeeType"
                rules={[
                  {
                    required: true,
                    message: "Please select the employee type!",
                  },
                ]}
              >
                <Select
                  size="medium"
                  placeholder="Select employee type"
                  onChange={(value) =>
                    handleSelectChange("employeeType", value)
                  }
                >
                  {employeeTypes.map((type) => (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please select the role!",
                  },
                ]}
              >
                <Select
                  size="medium"
                  placeholder="Select role"
                  onChange={(value) => handleSelectChange("role", value)}
                >
                  {roles.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                {/* <Link to="/DashLayout/employees"> */}
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="btn"
                >
                  Add Employee
                </Button>
                {/* </Link> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Link to="/DashLayout/employees">
                  <Button size="large" className="btn">
                    Cancel
                  </Button>
                </Link>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default AddEmployee;
