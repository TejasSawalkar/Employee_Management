import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Typography,
  message,
} from "antd";
import moment from "moment";
import { m } from "framer-motion";

const EmployeeUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7058/api/Employee/${id}`
        );
        const data = response.data;
        // Convert dateOfJoining to moment object if it's in string format
        if (data.dateOfJoining) {
          data.dateOfJoining = moment(data.dateOfJoining);
        }
        setFormData(data);
        form.setFieldsValue(data);
      } catch (error) {
        console.log("Error fetching employee data:", error);
      }
    };
    getEmployee();
  }, [id, form]);

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(
        `https://localhost:7058/admin/${id}`,
        values
      );
      console.log("Updated employee data:", response.data);
      message.success("Employee updated successfully!");
      navigate("/DashLayout/employees");
    } catch (error) {
      console.log("Error updating employee:", error);
    }
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfJoining: dateString,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { Option } = Select;

  return (
    <div className="admin">
      <Card className="form-container1">
        <Typography.Title level={3} strong className="title">
          Update Employee
        </Typography.Title>
        <Form
          form={form}
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
                  name="dateOfJoining"
                  size="medium"
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
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="btn"
                >
                  Update Employee
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button
                  size="large"
                  className="btn"
                  onClick={() => navigate("/DashLayout/employees")}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default EmployeeUpdate;
