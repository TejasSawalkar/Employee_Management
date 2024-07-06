import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
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

const { TextArea } = Input;
const { Option } = Select;

const EditProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    description: "",
    dueDate: "",
    githubLink: "",
    status: "",
  });

  const statusOptions = [
    "NotStarted",
    "Completed",
    "Cancelled",
    "OnHold",
    "InProgress",
  ];

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7058/getProject/${projectId}`
        );
        const data = response.data;
        if (data.dueDate) {
          data.dueDate = moment(data.dueDate);
        }
        setProjectDetails(data);
        form.setFieldsValue(data);
      } catch (error) {
        console.log("Error fetching project data:", error);
        message.error("Failed to fetch project data.");
      }
    };
    getProject();
  }, [projectId, form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setProjectDetails((prevData) => ({
      ...prevData,
      dueDate: dateString,
    }));
    form.setFieldsValue({ dueDate: date });
  };

  const handleSelectChange = (value) => {
    setProjectDetails((prevData) => ({
      ...prevData,
      status: value,
    }));
    form.setFieldsValue({ status: value });
  };

  const handleSubmit = async (values) => {
    try {
      const updatedProject = {
        ...projectDetails,
        ...values,
        dueDate: values.dueDate
          ? values.dueDate.format("YYYY-MM-DD")
          : projectDetails.dueDate,
      };
      await axios.put(
        `https://localhost:7058/updateProject/${projectId}`,
        updatedProject
      );
      message.success("Project updated successfully!");
      navigate("/DashLayout/project");
    } catch (error) {
      console.log("Error updating project:", error);
      message.error("Failed to update project.");
    }
  };

  return (
    <div className="admin">
      <Card className="form-container1">
        <Typography.Title level={3} strong className="title">
          Update Project
        </Typography.Title>
        <Form
          form={form}
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
                  onChange={handleSelectChange}
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
                  Update Project
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

export default EditProject;
