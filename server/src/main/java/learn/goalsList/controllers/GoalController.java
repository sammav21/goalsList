package learn.goalsList.controllers;

import learn.goalsList.domain.GoalService;
import learn.goalsList.domain.Result;
import learn.goalsList.models.Goal;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.events.Event;

import java.util.List;

@RestController
@RequestMapping("/api/goal")
public class GoalController {

    private final GoalService service;
    public GoalController(GoalService service){
        this.service = service;
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<Goal> findById(@PathVariable int goalId){
        Goal goal = service.findById(goalId);
        if(goal == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(goal);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Goal>> findByUserId(@PathVariable int userId){
        List<Goal> allGoals = service.findByUserId(userId);
        if(allGoals == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(allGoals);
    }

    @PostMapping
    public ResponseEntity<Object> createGoal(@RequestBody Goal goal){
        Result<Goal> result = service.createGoal(goal);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<Object> updateGoal( @PathVariable int goalId, @RequestBody Goal goal){
        if(goalId != goal.getGoalId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<Goal> result = service.updateGoal(goal);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Object> deleteGoal(@PathVariable int goalId){
        Result<Goal> result = service.deleteGoal(goalId);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
