package learn.goalsList.domain;

import learn.goalsList.data.SteppingStoneRepository;
import learn.goalsList.models.SteppingStone;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SteppingStoneService {

    private SteppingStoneRepository repository;
    public SteppingStoneService(SteppingStoneRepository repository){
        this.repository = repository;
    }

    public SteppingStone findById(int steppingStoneId){
        return repository.findById(steppingStoneId);
    }
    public List<SteppingStone> findByGoalId(int goalId){
        return repository.findByGoalId(goalId);
    }

    public Result<SteppingStone> createSteppingStone(SteppingStone steppingStone){
        Result<SteppingStone> result = validate(steppingStone);

        if(!result.isSuccess()){
            return result;
        }
        if(steppingStone.getSteppingStoneId() != 0){
            result.setMessages("SteppingStone ID cannot be set before creating SteppingStone", ResultType.INVALID);
            return result;
        }

        steppingStone = repository.createSteppingStone(steppingStone);
        result.setPayload(steppingStone);
        return result;
    }

    public Result<SteppingStone> updateSteppingStone(SteppingStone steppingStone){
        Result<SteppingStone> result = validate(steppingStone);
        if(!result.isSuccess()){
            return result;
        }
        if(steppingStone.getSteppingStoneId() <= 0){
            result.setMessages("SteppingStone ID required for update", ResultType.INVALID);
            return result;
        }
        if(!repository.updateSteppingStone(steppingStone)){
            String message = String.format("steppingStoneId: %s not found", steppingStone.getSteppingStoneId());
            result.setMessages(message, ResultType.NOT_FOUND);
        }
        return result;
    }

    public Result<SteppingStone> deleteSteppingStone(int steppingStoneId){
        Result<SteppingStone> result = new Result<>();
        if(steppingStoneId <= 0){
            result.setMessages("SteppingStone ID required for delete", ResultType.INVALID);
            return result;
        }
        if(!repository.deleteSteppingStone(steppingStoneId)){
            String message = String.format("steppingStoneId: %s not found", steppingStoneId);
            result.setMessages(message, ResultType.NOT_FOUND);
        }
        return result;
    }
    private Result<SteppingStone> validate(SteppingStone steppingStone){
        Result<SteppingStone> result = new Result<>();

        if(steppingStone.getName() == null || steppingStone.getName().isEmpty() || steppingStone.getName().isBlank()){
            result.setMessages("SteppingStone name required", ResultType.INVALID);
            return result;
        }
        return result;
    }
}
