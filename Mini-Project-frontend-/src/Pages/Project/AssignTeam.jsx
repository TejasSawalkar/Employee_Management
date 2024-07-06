import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

export default function AssignTeam() {
    const [teams, setTeams] = useState([]);
    const {projectId}=useParams();
    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await axios.get('https://localhost:7058/teams/getTeams');
                setTeams(response.data); // Assuming response.data is an array of team objects
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        }

        fetchTeams();
    }, []);

    
    const handleRowClick = async(teamId) => {
        try {
            const response=await axios.put(`https://localhost:7058/assignProject/${projectId}/${teamId}`);
            console.log("project assigned to team");
            
        } catch (error) {
            console.log("error=",error);
        }
    };

    return (
        <div>
            <h1>Teams</h1>
            <table>
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.teamId} onClick={() => handleRowClick(team.teamId)}>
                            <td>{team.teamName}</td>
                            <td>{team.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
