package org.goalsList.data.mappers;

import org.goalsList.models.Goal;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class GoalMapper implements RowMapper<Goal> {

    @Override
    public Goal mapRow(ResultSet rs, int rowNum) throws SQLException {
        Goal goal = new Goal();
        goal.setGoalId(rs.getInt("goal_id"));
        goal.setName(rs.getString("name"));
        goal.setChecked(rs.getBoolean("checked"));
        goal.setReason(rs.getString("reason"));
        goal.setRealisticDeadline(rs.getString("realistic_deadline"));
        goal.setAmbitiousDeadline(rs.getString("ambitious_deadline"));
        goal.setAppUserId(rs.getInt("app_user_id"));
        return goal;
    }
}
