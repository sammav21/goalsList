package org.goalsList.data;

import org.goalsList.data.mappers.SteppingStoneMapper;
import org.goalsList.models.SteppingStone;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
        return null;
    }

    @Override
    public boolean updateSteppingStone(SteppingStone steppingStone) {
        return false;
    }

    @Override
    public boolean deleteSteppingStone(int steppingStoneId) {
        return false;
    }
}
