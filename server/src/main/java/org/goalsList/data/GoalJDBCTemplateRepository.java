package org.goalsList.data;

import org.goalsList.data.mappers.GoalMapper;
import org.goalsList.models.Goal;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

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
        return null;
    }

    @Override
    public Goal createGoal(Goal goal) {
        return null;
    }

    @Override
    public boolean updateGoal(Goal goal) {
        return false;
    }

    @Override
    public boolean deleteGoal(int goalId) {
        return false;
    }
}
