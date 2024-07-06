import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetails.css"

export default function ProjectDetails() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function getProjectDetails() {
            try {
                const response = await axios.get(`https://localhost:7058/getProject/${projectId}`);
                setProject(response.data);
            } catch (error) {
                console.log("error=", error);
            }
        }
        getProjectDetails();
    }, [projectId]);

    useEffect(() => {
        async function getTeam() {
            if (project && project.teamId) {
                try {
                    const response = await axios.get(`https://localhost:7058/teams/${project.teamId}/getEmployees`);
                    setMembers(response.data);
                } catch (error) {
                    console.log("Error=", error);
                }
            }
        }
        getTeam();
    }, [project]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="project-details">
            <h2>Project Details</h2>
            <div className="project-info">
                <p><strong>Project Name:</strong> {project.projectName}</p>
                <p><strong>Description:</strong> {project.description}</p>
                <p><strong>Due Date:</strong> {project.dueDate}</p>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>github Link:</strong> {project.githubLink}</p>
            </div>
            <h1>Project Team Members</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((m) => (
                        <tr key={m.id}>
                            <td>{m.firstName}</td>
                            <td>{m.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
