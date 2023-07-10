package learn.goalsList.data;

import learn.goalsList.models.SteppingStone;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
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
        List<SteppingStone> allSteppingStones = repository.findByGoalId(1);
        assertEquals(1, allSteppingStones.size());
        assertEquals("Book a flight", allSteppingStones.get(0).getName());
    }

    @Test
    void createSteppingStone() {
        SteppingStone steppingStoneToAdd = createTestSteppingStone();
        SteppingStone actual = repository.createSteppingStone(steppingStoneToAdd);
        assertNotNull(actual);
        assertEquals(3, actual.getSteppingStoneId());
    }

    @Test
    void updateSteppingStone() {
        SteppingStone steppingStoneToUpdate = new SteppingStone();
        steppingStoneToUpdate.setSteppingStoneId(1);
        steppingStoneToUpdate.setName("updated");
        steppingStoneToUpdate.setGoalId(1);
        assertTrue(repository.updateSteppingStone(steppingStoneToUpdate));
        assertEquals("updated", repository.findById(1).getName());
    }

    @Test
    void deleteSteppingStone() {
        assertTrue(repository.deleteSteppingStone(2));
    }

    private SteppingStone createTestSteppingStone(){
        SteppingStone newSteppingStone = new SteppingStone();
        newSteppingStone.setName("added steppingStone");
        newSteppingStone.setChecked(false);
        newSteppingStone.setGoalId(1);
        return newSteppingStone;
    }
}