package learn.goalsList.data.mappers;

import learn.goalsList.models.SteppingStone;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SteppingStoneMapper implements RowMapper<SteppingStone> {
    @Override
    public SteppingStone mapRow(ResultSet rs, int rowNum) throws SQLException {
        SteppingStone steppingStone = new SteppingStone();
        steppingStone.setSteppingStoneId(rs.getInt("stepping_stone_id"));
        steppingStone.setName(rs.getString("name"));
        steppingStone.setChecked(rs.getBoolean("checked"));
        steppingStone.setGoalId(rs.getInt("goal_id"));
        return steppingStone;
    }
}
