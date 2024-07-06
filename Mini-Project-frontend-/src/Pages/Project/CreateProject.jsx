import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Typography,
  Button,
  DatePicker,
  Row,
  Col,
  message,
  Select,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const CreateProject = () => {
  const navigate = useNavigate();

  const [projectDetails, setprojectDetails] = useState({
    projectName: "",
    description: "",
    dueDate: "",
    githubLink: "",
    status: "",
  });

  const statusOptions = [
    'NotStarted',
    'Completed',
    'Cancelled',
    'OnHold',
    'InProgress'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setprojectDetails({
      ...projectDetails,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setprojectDetails({
      ...projectDetails,
      [name]: value,
    });
  };
  const handleDateChange = (date, dateString) => {
    setprojectDetails({
      ...projectDetails,
      dueDate: dateString,
    });
  };


  async function handleSubmit() {
    try {
        const response = await axios.post(`https://localhost:7058/createProject/`, projectDetails);
        console.log(response.data);
        console.log("Project id is =",response.data)
        navigate("/DashLayout/project");
        
    } catch (error) {
        console.log("error=", error);
    }
}
  

  return (
    <div className="admin">
      <Card className="form-container1">
        <Typography.Title level={3} strong className="title">
          Create Project
        </Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          initialValues={projectDetails}
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Project Name"
                name="projectName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your project name!",
                  },
                ]}
              >
                <Input
                  name="projectName"
                  size="medium"
                  placeholder="Enter your project name"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter project description",
                  },
                ]}
              >
                <TextArea
                  name="description"
                  rows={1}
                  placeholder="Enter project description"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Due Date"
                name="dueDate"
                rules={[
                  {
                    required: true,
                    message: "Please select the due date!",
                  },
                ]}
              >
                <DatePicker
                  name="dueDate"
                  size="medium"
                  onChange={handleDateChange}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Github Link"
                name="githubLink"
                rules={[
                  {
                    required: true,
                    message: "Please enter githubLink!",
                  },
                ]}
              >
                <Input
                  name="githubLink"
                  size="medium"
                  placeholder="Enter your githubLink"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Please select the status!",
                  },
                ]}
              >
                <Select

                  size="medium"
                  placeholder="Select status"
                  onChange={(value) =>
                    handleSelectChange("status", value)
                  }
                >
                  {statusOptions.map((type) => (
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
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="btn"
                >
                  Create Project
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button
                  size="large"
                  className="btn"
                  onClick={() => navigate("/DashLayout/project")}
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

export default CreateProject;
