package learn.goalsList.data;

import learn.goalsList.data.mappers.SteppingStoneMapper;
import learn.goalsList.models.SteppingStone;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class SteppingStoneJDBCTemplateRepository implements SteppingStoneRepository{

    private JdbcTemplate jdbcTemplate;
    public SteppingStoneJDBCTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public SteppingStone findById(int steppingStoneId) {
        String sqlStatement = "Select * from stepping_stone where stepping_stone_id = ?";
        return jdbcTemplate.query(sqlStatement, new SteppingStoneMapper(), steppingStoneId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public List<SteppingStone> findByGoalId(int goalId) {
        String sqlStatement = "Select * from stepping_stone where goal_id = ?";
        return jdbcTemplate.query(sqlStatement, new SteppingStoneMapper(), goalId).stream()
                .collect(Collectors.toList());
    }

    @Override
    public SteppingStone createSteppingStone(SteppingStone steppingStone) {
        String sqlStatement = "insert into stepping_stone (`name`, checked, goal_id) values (?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqlStatement, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, steppingStone.getName());
            ps.setBoolean(2, steppingStone.isChecked());
            ps.setInt(3, steppingStone.getGoalId());
            return ps;
        }, keyHolder);
        if(rowsAffected <= 0){
            return null;
        }
        steppingStone.setSteppingStoneId(keyHolder.getKey().intValue());
        return steppingStone;
    }

    @Override
    public boolean updateSteppingStone(SteppingStone steppingStone) {
        String sqlStatement = "update stepping_stone set " +
                "`name` = ?, " +
                "checked = ?, " +
                "goal_id = ? " +
                "where stepping_stone_id = ?;";
        return jdbcTemplate.update(sqlStatement, steppingStone.getName(), steppingStone.isChecked(), steppingStone.getGoalId(), steppingStone.getSteppingStoneId()) > 0;
    }

    @Override
    public boolean deleteSteppingStone(int steppingStoneId) {
        return jdbcTemplate.update("delete from stepping_stone where stepping_stone_id = ?;", steppingStoneId) > 0;
    }
}
