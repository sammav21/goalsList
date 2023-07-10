package learn.goalsList.data;

import learn.goalsList.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

public interface AppUserRepository {
    @Transactional
    AppUser findByUsername(String username);
    @Transactional
    AppUser findByUserId(int appUserId);
    @Transactional
    AppUser createUser(AppUser user);
    @Transactional
    boolean updateUser(AppUser user);
    @Transactional
    boolean deleteUser(int appUserId);
}
