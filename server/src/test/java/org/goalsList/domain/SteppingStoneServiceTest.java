package org.goalsList.domain;

import org.goalsList.data.SteppingStoneRepository;
import org.goalsList.models.Goal;
import org.goalsList.models.SteppingStone;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class SteppingStoneServiceTest {

    @Autowired
    SteppingStoneService service;
    @MockBean
    SteppingStoneRepository repository;


    @Test
    void createSteppingStone() {
        SteppingStone steppingStoneToCreate = createTestSteppingStone();
        SteppingStone mockResult = createTestSteppingStone();
        mockResult.setSteppingStoneId(3);

        when(repository.createSteppingStone(steppingStoneToCreate)).thenReturn(mockResult);
        Result<SteppingStone> actual = service.createSteppingStone(steppingStoneToCreate);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockResult, actual.getPayload());
    }

    @Test
    void shouldNotCreateSteppingStoneIfNameMissing(){
        SteppingStone steppingStoneToCreate = new SteppingStone();

        Result<SteppingStone> actual = service.createSteppingStone(steppingStoneToCreate);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldNotCreateSteppingStoneWhenIDAlreadyExists(){
        SteppingStone steppingStoneToCreate = new SteppingStone();
        steppingStoneToCreate.setSteppingStoneId(1);

        Result<SteppingStone> actual = service.createSteppingStone(steppingStoneToCreate);
        assertEquals(ResultType.INVALID, actual.getType());
    }
    @Test
    void updateSteppingStone() {
        SteppingStone steppingStoneToUpdate = createTestSteppingStone();
        steppingStoneToUpdate.setSteppingStoneId(1);
        steppingStoneToUpdate.setName("updated name");

        when(repository.updateSteppingStone(steppingStoneToUpdate)).thenReturn(true);

        Result<SteppingStone> actual = service.updateSteppingStone(steppingStoneToUpdate);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotUpdateWithoutID(){
        SteppingStone steppingStonelToUpdate = createTestSteppingStone();

        when(repository.updateSteppingStone(steppingStonelToUpdate)).thenReturn(false);

        Result<SteppingStone> actual = service.updateSteppingStone(steppingStonelToUpdate);
        assertEquals(ResultType.INVALID, actual.getType());
    }
    @Test
    void shouldNotUpdateWhenIDDoesNotExist(){
        SteppingStone steppingStoneToUpdate = createTestSteppingStone();
        steppingStoneToUpdate.setSteppingStoneId(99);
        when(repository.updateSteppingStone(steppingStoneToUpdate)).thenReturn(false);

        Result<SteppingStone> actual = service.updateSteppingStone(steppingStoneToUpdate);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }
    @Test
    void deleteSteppingStone() {
        when(repository.deleteSteppingStone(2)).thenReturn(true);
        Result<SteppingStone> actual = service.deleteSteppingStone(2);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteIfDoesntExist(){
        when(repository.deleteSteppingStone(6)).thenReturn(false);
        Result<SteppingStone> actual = service.deleteSteppingStone(99);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }
    private SteppingStone createTestSteppingStone(){
        SteppingStone steppingStone = new SteppingStone();
        steppingStone.setName("added steppingStone");
        steppingStone.setChecked(false);
        steppingStone.setGoalId(1);
        return steppingStone;
    }
}