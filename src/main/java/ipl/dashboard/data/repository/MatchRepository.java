package ipl.dashboard.data.repository;

import ipl.dashboard.data.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2,
                                                 Pageable pageable);
    /*List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
            String teamName1, LocalDate date1, LocalDate date2,
            String teamName2, LocalDate date3, LocalDate date4);*/
    @Query("select m from Match m where (m.team1=:teamName or m.team2=:teamName) and m.date between :dateStart and :dateEnd order by m.date desc")
    List<Match> getMatchesByTeamBetweenDates(@Param("teamName") String teamName,
                                             @Param("dateStart") LocalDate dateStart,
                                             @Param("dateEnd") LocalDate dateEnd);

    default List<Match> findLatestMatchesByTeam(String teamName1, String teamName2, int count){
        Pageable pageable = PageRequest.of(0, count);
        return getByTeam1OrTeam2OrderByDateDesc(teamName1, teamName2,  pageable);
    }
}
