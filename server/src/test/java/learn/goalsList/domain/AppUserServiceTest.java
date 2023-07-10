package learn.goalsList.domain;

import learn.goalsList.data.AppUserRepository;
import learn.goalsList.models.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
class AppUserServiceTest {

    @Autowired
    AppUserService service;

    @MockBean
    AppUserRepository repository;

    @MockBean
    PasswordEncoder encoder;

    @Test
    void shouldLoadUserByUsername() {
        AppUser expected = new AppUser(1, "test", "testPassword", true, List.of("USER"));
        when(repository.findByUsername("test")).thenReturn(expected);

        UserDetails result = service.loadUserByUsername("test");

        assertEquals(expected, result);
    }

    @Test
    void shouldCreateUser() {
        String username = "test@test.com";
        String password = "testP@ssword2";

        AppUser createUser = new AppUser(34, "test@test.com", "testP@ssword2", true, List.of("USER"));

        when(repository.createUser(any())).thenReturn(createUser);

        Result<AppUser> result = service.createUser(username, password);

        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotCreateWithNullUsername() {
        Result<AppUser> result = service.createUser(null, "H0meRun!");

        assertFalse(result.isSuccess());
        assertNull(result.getPayload());
    }
    @Test
    void shouldDeleteUser() {
        when(repository.deleteUser(1)).thenReturn(true);
        Result<AppUser> actual = service.deleteUser(1);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    void shouldNotDeleteUserIfDoesNotExist(){
        when(repository.deleteUser(61)).thenReturn(false);
        Result<AppUser> actual = service.deleteUser(61);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }
}