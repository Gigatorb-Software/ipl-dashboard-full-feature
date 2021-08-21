import React from 'react'
import { Link } from 'react-router-dom'
import './TeamTile.css'

function TeamTile({teamName}) {
    return (
        <div className="teamTile">
            <Link to={`/teams/${teamName}`} ><h1>{teamName}</h1></Link>
        </div>
    )
}

export default TeamTile
