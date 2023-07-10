package learn.goalsList.data;

import learn.goalsList.models.Goal;

import java.util.List;

public interface GoalRepository {

    Goal findById(int goalId);
    List<Goal> findByUserId(int userId);
    Goal createGoal(Goal goal);
    boolean updateGoal(Goal goal);
    boolean deleteGoal(int goalId);

}
