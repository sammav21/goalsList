package learn.goalsList.domain;

import learn.goalsList.data.GoalRepository;
import learn.goalsList.models.Goal;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {

    private GoalRepository repository;
    public GoalService(GoalRepository repository){
        this.repository = repository;
    }
    public Goal findById(int goalId){
        return repository.findById(goalId);
    }

    public List<Goal>findByUserId(int userId){
        return repository.findByUserId(userId);
    }

    public Result<Goal> createGoal(Goal goal){
        Result<Goal> result = validate(goal);

        if(!result.isSuccess()){
            return result;
        }
        if(goal.getGoalId() != 0){
            result.setMessages("Goal ID cannot be set before creating Goal", ResultType.INVALID);
            return result;
        }

        goal = repository.createGoal(goal);
        result.setPayload(goal);
        return result;
    }

    public Result<Goal> updateGoal(Goal goal){
        Result<Goal> result = validate(goal);
        if(!result.isSuccess()){
            return result;
        }
        if(goal.getGoalId() <= 0){
            result.setMessages("Goal ID required for update", ResultType.INVALID);
            return result;
        }
        if(!repository.updateGoal(goal)){
            String message = String.format("goalId: %s not found", goal.getGoalId());
            result.setMessages(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<Goal> deleteGoal(int goalId){
        Result<Goal> result = new Result<>();
        if(goalId <= 0){
            result.setMessages("Goal ID required for delete", ResultType.INVALID);
            return result;
        }
        if(!repository.deleteGoal(goalId)){
            String message = String.format("goalId: %s not found", goalId);
            result.setMessages(message, ResultType.NOT_FOUND);
        }
        return result;
    }
    private Result<Goal> validate(Goal goal){
        Result<Goal> result = new Result<>();

        if(goal == null){
            result.setMessages("Goal cannot be null", ResultType.INVALID);
            return result;
        }
        if(goal.getName() == null || goal.getName().isEmpty() || goal.getName().isBlank()){
            result.setMessages("Goal name required", ResultType.INVALID);
            return result;
        }
        return result;
    }
}
