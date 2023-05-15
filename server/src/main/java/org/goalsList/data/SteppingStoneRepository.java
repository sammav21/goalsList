package org.goalsList.data;

import org.goalsList.models.SteppingStone;

import java.util.List;

public interface SteppingStoneRepository {

    SteppingStone findById(int steppingStoneId);
    List<SteppingStone> findByGoalId(int goalId);
    SteppingStone createSteppingStone(SteppingStone steppingStone);
    boolean updateSteppingStone(SteppingStone steppingStone);
    boolean deleteSteppingStone(int steppingStoneId);
}
