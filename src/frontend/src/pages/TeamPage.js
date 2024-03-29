import {React, useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import MatchDetailCard from '../components/MatchDetailCard'
import MatchSmallCard from '../components/MatchSmallCard'
import './TeamPage.css'
import { PieChart } from 'react-minimal-pie-chart';

function TeamPage() {
    
    const [team, setTeam] = useState({matches:[]});
    const {teamName} = useParams();
    const endYear = process.env.REACT_APP_DATA_END_YEAR;

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/api/v1/teams/${teamName}`);
                const data = await response.json();
                setTeam(data);
            };
            fetchMatches();
        }, [teamName]
    );

    if(!team || !team.teamName){
        return <h1> Team not found.</h1>
    }
    return (
        <div className="teamPage">
            <div className="team-name">
                <h1>{team.teamName}</h1>
            </div>
            <div className="win-loss">
                Wins / Losses
                <PieChart
                    data={[
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d' },
                        { title: 'Wins', value: team.totalWins, color: '#4da375' },
                    ]}
                />
            </div>
            <div className="match-detail">
                <h3>Latest Matches</h3>
                <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
            </div>
                {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} teamName={team.teamName} match={match}/>)}
            <div className="more-link">
                <Link to={`/teams/${teamName}/matches/${endYear}`}>More {'>'}</Link>
            </div>
            
        </div>
    )
}

export default TeamPage
