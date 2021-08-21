package ipl.dashboard.controller;

import ipl.dashboard.data.model.Match;
import ipl.dashboard.data.model.Team;
import ipl.dashboard.service.MatchService;
import ipl.dashboard.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1")
public class TeamController {

    @Autowired
    private TeamService teamService;
    @Autowired
    private MatchService matchService;

    @GetMapping("/teams")
    public List<Team> getAllTeamName(){
        return teamService.getAllTeams();
    }

    @GetMapping("/teams/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        Team team =  this.teamService.getTeam(teamName);
        team.setMatches(matchService.getMatchesByTeamName(teamName, teamName));
        return team;
    }

    @GetMapping("/teams/{teamName}/matches")
    public List<Match> getMatchesForTeam(@PathVariable String teamName, @RequestParam int year){
        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year+1, 1, 1);
        return matchService.getMatchesByTeamBetweenDates(
                teamName, startDate, endDate);
    }
}
