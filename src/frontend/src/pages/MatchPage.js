import {React, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import MatchDetailCard from '../components/MatchDetailCard';
import YearSelector from '../components/YearSelector';
import './MatchPage.css'

function MatchPage() {
    const [matches, setMatches] = useState([]);
    const {teamName, year} = useParams();

    useEffect(
        () => {
            const fetchMatches = async () => {
                const response = await fetch(`http://localhost:8080/api/v1/teams/${teamName}/matches?year=${year}`);
                const data = await response.json();
                setMatches(data);
            };
            fetchMatches();
        }, [teamName, year]
    );

    return (
        <div className="matchPage">
            <div className="yearSelector">
                <h3>Select year</h3>
                <YearSelector teamName={teamName}/>
            </div>
            <div>
                <h1 className="page-heading">{teamName} matches in {year}</h1>
                {
                    matches.map(match => <MatchDetailCard teamName={teamName} match={match}/>)
                }
            </div>
        </div>
    )
}

export default MatchPage