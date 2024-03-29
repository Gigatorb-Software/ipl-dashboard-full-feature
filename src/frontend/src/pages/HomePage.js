import {React, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import TeamTile from '../components/TeamTile';
import './HomePage.css'

function HomePage() {

    const [teams, setTeams] = useState([]);
    
    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`http://localhost:8080/api/v1/teams`);
                const data = await response.json();
                setTeams(data);
            };
            fetchTeams();
        }, []
    );

    return (
        <div className="homePage">
            <div className="header-section">
                <h1 className="app-name">IPL Dashboard</h1>
            </div>
            <div className="team-grid">
                {teams.map(team => <TeamTile teamName={team.teamName} />)}
            </div>
        </div>
    )
}

export default HomePage
