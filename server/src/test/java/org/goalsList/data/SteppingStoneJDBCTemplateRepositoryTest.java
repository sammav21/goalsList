package org.goalsList.data;

import org.goalsList.models.SteppingStone;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SteppingStoneJDBCTemplateRepositoryTest {

    @Autowired
    private SteppingStoneJDBCTemplateRepository repository;
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
    void findById() {
        SteppingStone steppingStone = repository.findById(1);
        assertEquals("Book a flight", steppingStone.getName());
    }

    @Test
    void shouldReturnNullIfSteppingStoneDoesNotExist(){
        SteppingStone steppingStone = repository.findById(99);
        assertNull(steppingStone);
    }
    @Test
    void findByGoalId() {
        List<SteppingStone> allSteppingStones = repository.findByGoalId(3);
        assertEquals(1, allSteppingStones.size());
        assertEquals("delete me", allSteppingStones.get(0).getName());
    }

    @Test
    void createSteppingStone() {
    }

    @Test
    void updateSteppingStone() {
    }

    @Test
    void deleteSteppingStone() {
    }
}