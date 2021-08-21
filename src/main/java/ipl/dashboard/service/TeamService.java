package ipl.dashboard.service;

import ipl.dashboard.data.model.Team;
import ipl.dashboard.data.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamService {
    @Autowired
    private TeamRepository teamRepository;

    public Team getTeam(String teamName){
        return teamRepository.findByTeamName(teamName);
    }

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }
}
