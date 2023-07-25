package learn.goalsList.controllers;

import learn.goalsList.domain.Result;
import learn.goalsList.domain.SteppingStoneService;
import learn.goalsList.models.SteppingStone;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/steppingStone")
public class SteppingStoneController {

    private final SteppingStoneService service;

    public SteppingStoneController(SteppingStoneService service){
        this.service = service;
    }

    @GetMapping("/{goalId}")
    public ResponseEntity<List<SteppingStone>> findByGoalId(@PathVariable int goalId){
        List<SteppingStone> allSteppingStones = service.findByGoalId(goalId);
        if(allSteppingStones == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(allSteppingStones);
    }

    @PostMapping
    public ResponseEntity<Object> createSteppingStone(@RequestBody SteppingStone steppingStone){
        Result<SteppingStone> result = service.createSteppingStone(steppingStone);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
    @PutMapping("/{steppingStoneId}")
    public ResponseEntity<Object> updateSteppingStone(@PathVariable int steppingStoneId, @RequestBody SteppingStone steppingStone){
        if(steppingStoneId != steppingStone.getSteppingStoneId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result<SteppingStone> result = service.updateSteppingStone(steppingStone);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{steppingStoneId}")
    public ResponseEntity<Object> deleteSteppingStone(@PathVariable int steppingStoneId){
        Result<SteppingStone> result = service.deleteSteppingStone(steppingStoneId);
        if(result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ErrorResponse.build(result);
    }
}
