package learn.goalsList.data;

import learn.goalsList.models.AppUser;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    private AppUserJdbcTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    static boolean hasSetup = false;

    @BeforeEach
    void setup() {
        hasSetup = false;
        if (!hasSetup) {
            hasSetup = true;
            jdbcTemplate.update("call set_known_good_state();");
        }
    }

    @Test
    void findByUsername() {
        AppUser result = repository.findByUsername("john@smith.com");
        assertNotNull(result);
    }
    @Test
    void shouldNotFindNonExistantUser(){
        AppUser result = repository.findByUsername("test");
        assertNull(result);
    }

    @Test
    void findByUserId() {
        AppUser result = repository.findByUserId(1);
        assertNotNull(result);
    }

    @Test
    void createUser() {
        AppUser appUser = new AppUser(0, "userTest", "pw123", true, List.of("USER"));

        repository.createUser(appUser);
        AppUser result = repository.findByUsername("userTest");
        assertEquals("userTest", result.getUsername());
        assertEquals("pw123", result.getPassword());
    }

    @Test
    void updateUser() {
        AppUser userToUpdate = repository.findByUsername("john@smith.com");
        userToUpdate.setUsername("updatedTest");

        assertTrue(repository.updateUser(userToUpdate));
        Assertions.assertEquals("updatedTest", repository.findByUsername("updatedTest").getUsername());

    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteUser(1));
        assertFalse(repository.deleteUser(1));
    }

    @Test
    void shouldNotDeleteIfDoesNotExists(){
        assertFalse(repository.deleteUser(5));
    }
}