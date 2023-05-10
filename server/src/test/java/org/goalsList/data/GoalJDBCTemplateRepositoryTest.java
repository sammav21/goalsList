package org.goalsList.data;

import org.goalsList.models.Goal;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

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
    void findByUserId() {
    }

    @Test
    void createGoal() {
    }

    @Test
    void updateGoal() {
    }

    @Test
    void deleteGoal() {
    }
}