package org.goalsList.data;

import org.goalsList.models.Goal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class GoalJDBCTemplateRepositoryTest {

    @Autowired
    private GoalJDBCTemplateRepository repository;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    static boolean hasSetup = false;
    @BeforeEach
    void setup() {
        hasSetup = false;
        if (!hasSetup) {
            jdbcTemplate.update("call set_known_good_state();");
            hasSetup = true;
        }
    }
    @Test
    void shouldfindById() {
        Goal goal = repository.findById(1);
        assertEquals("Vacation", goal.getName());
    }

    @Test
    void shouldReturnNullIfGoalDoesNotExist() {
        Goal goal = repository.findById(4);
        assertNull(goal);
    }

    @Test
    void findByUserId() {
        List<Goal> allGoals = repository.findByUserId(1);
        assertEquals(3, allGoals.size());
        assertEquals("Vacation2", allGoals.get(1).getName());
    }
    @Test
    void shouldReturnNullIfUserDoesNotExist() {
        List<Goal> allGoals = repository.findByUserId(3);
        assertEquals(0, allGoals.size());
    }
    @Test
    void shouldCreateGoal() {
        Goal goalToAdd = createTestGoal();
        Goal actual = repository.createGoal(goalToAdd);
        assertNotNull(actual);
        assertEquals(5, actual.getGoalId());
    }

    @Test
    void updateGoal() {
        Goal goalToUpdate = new Goal();
        goalToUpdate.setGoalId(3);
        goalToUpdate.setName("Vacation2");
        goalToUpdate.setReason("updated goal");
        assertTrue(repository.updateGoal(goalToUpdate));
        assertEquals("updated goal", repository.findById(3).getReason());
    }

    @Test
    void deleteGoal() {
        assertTrue(repository.deleteGoal(3));
    }

    private Goal createTestGoal(){
        Goal newGoal = new Goal();
        newGoal.setName("added goal");
        newGoal.setChecked(false);
        newGoal.setReason("test reason");
        newGoal.setRealisticDeadline("test");
        newGoal.setAmbitiousDeadline("test");
        newGoal.setAppUserId(1);
        return newGoal;
    }
}