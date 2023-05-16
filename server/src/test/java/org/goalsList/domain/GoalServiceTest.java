package org.goalsList.domain;

import org.goalsList.data.GoalRepository;
import org.goalsList.models.Goal;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class GoalServiceTest {

    @Autowired
    GoalService service;
    @MockBean
    GoalRepository repository;

    @Test
    void createGoal() {
        Goal goalToCreate = createTestGoal();
        Goal mockResult = createTestGoal();
        mockResult.setGoalId(5);

        when(repository.createGoal(goalToCreate)).thenReturn(mockResult);
        Result<Goal> actual = service.createGoal(goalToCreate);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockResult, actual.getPayload());
    }

    @Test
    void shouldNotCreateGoalIfNameMissing(){
        Goal goalToCreate = new Goal();
        goalToCreate.setReason("test");

        Result<Goal> actual = service.createGoal(goalToCreate);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotCreateWhenIDAlreadyExists(){
        Goal goalToCreate = createTestGoal();
        goalToCreate.setGoalId(5);

        Result<Goal> actual = service.createGoal(goalToCreate);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdateGoal(){
        Goal goalToUpdate = createTestGoal();
        goalToUpdate.setGoalId(3);
        goalToUpdate.setName("updated name");

        when(repository.updateGoal(goalToUpdate)).thenReturn(true);

        Result<Goal> actual = service.updateGoal(goalToUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }
    @Test
    void shouldNotUpdateWithoutID(){
        Goal goalToUpdate = createTestGoal();

        when(repository.updateGoal(goalToUpdate)).thenReturn(false);

        Result<Goal> actual = service.updateGoal(goalToUpdate);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotUpdateWhenIDDoesNotExist(){
        Goal goalToUpdate = createTestGoal();
        goalToUpdate.setGoalId(99);
        when(repository.updateGoal(goalToUpdate)).thenReturn(false);

        Result<Goal> actual = service.updateGoal(goalToUpdate);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldDeleteGoal(){
        when(repository.deleteGoal(3)).thenReturn(true);
        Result<Goal> actual = service.deleteGoal(3);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteIfDoesntExist(){
        when(repository.deleteGoal(6)).thenReturn(false);
        Result<Goal> actual = service.deleteGoal(99);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }
    private Goal createTestGoal(){
        Goal goal = new Goal();
        goal.setName("added goal");
        goal.setChecked(false);
        goal.setReason("test reason");
//        goal.setRealisticDeadline("test");
//        goal.setAmbitiousDeadline("test");
        goal.setAppUserId(1);
        return goal;
    }
}