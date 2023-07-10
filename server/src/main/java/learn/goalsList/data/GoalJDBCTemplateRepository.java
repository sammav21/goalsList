package learn.goalsList.data;

import learn.goalsList.data.mappers.GoalMapper;
import learn.goalsList.models.Goal;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class GoalJDBCTemplateRepository implements GoalRepository{

    private JdbcTemplate jdbcTemplate;
    public GoalJDBCTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public Goal findById(int goalId) {
        String sqlStatement = "Select * from goal where goal_id = ?";
        return jdbcTemplate.query(sqlStatement, new GoalMapper(), goalId).stream()
                .findFirst().orElse(null);
    }

    @Override
    public List<Goal> findByUserId(int userId) {
        String sqlStatement = "Select * from goal where app_user_id = ?";
        return jdbcTemplate.query(sqlStatement, new GoalMapper(), userId).stream()
                .collect(Collectors.toList());
    }

    @Override
    public Goal createGoal(Goal goal) {
        String sqlStatement = "insert into goal (`name`, checked, reason, realistic_deadline, ambitious_deadline, app_user_id) values (?, ?, ?, ?, ?, ?);";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqlStatement, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, goal.getName());
            ps.setBoolean(2, goal.isChecked());
            ps.setString(3, goal.getReason());
            ps.setString(4, goal.getRealisticDeadline());
            ps.setString(5, goal.getAmbitiousDeadline());
            ps.setInt(6, goal.getAppUserId());
            return ps;
        }, keyHolder);
        if(rowsAffected <= 0){
            return null;
        }
        goal.setGoalId(keyHolder.getKey().intValue());
        return goal;
    }

    @Override
    public boolean updateGoal(Goal goal) {
        String sqlStatement = "update goal set " +
                "`name` = ?, " +
                "checked = ?, " +
                "reason = ?, " +
                "realistic_deadline = ?, " +
                "ambitious_deadline = ? " +
                "where goal_id = ?;";
        return jdbcTemplate.update(sqlStatement, goal.getName(), goal.isChecked(),
                goal.getReason(), goal.getRealisticDeadline(), goal.getAmbitiousDeadline(), goal.getGoalId()) > 0;
    }

    @Override
    @Transactional
    public boolean deleteGoal(int goalId) {
        jdbcTemplate.update("delete from stepping_stone where goal_id = ?;", goalId);
        return jdbcTemplate.update("delete from goal where goal_id = ?;", goalId) > 0;
    }
}
