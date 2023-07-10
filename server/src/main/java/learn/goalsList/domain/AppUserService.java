package learn.goalsList.domain;

import learn.goalsList.data.AppUserRepository;
import learn.goalsList.models.AppUser;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository repository;
    private final PasswordEncoder encoder;
    public AppUserService(AppUserRepository repository, PasswordEncoder encoder){
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser= repository.findByUsername(username);

        if(appUser == null || !appUser.isEnabled()){
            throw new UsernameNotFoundException(username + "not found");
        }
        return appUser;
    }
    public AppUser findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public Result<AppUser> createUser(String username, String password) {
        Result<AppUser> result = validate(username, password);
        if (!result.isSuccess()) {
            return result;
        }

        password = encoder.encode(password);

        AppUser appUser = new AppUser(0, username, password, true, List.of("USER"));

        try {
            appUser = repository.createUser(appUser);
            result.setPayload(appUser);
        } catch (DuplicateKeyException e) {
            result.setMessages("The provided username already exists", ResultType.INVALID);
        }

        return result;
    }

    public Result<AppUser> deleteUser(int appUserId) {
        Result<AppUser> result = new Result<>();
        if(appUserId <= 0){
            result.setMessages("appUserId required for delete operation", ResultType.INVALID);
            return result;
        }
        if(!repository.deleteUser(appUserId)){
            String message = String.format("appUserId: %s not found", appUserId);
            result.setMessages(message,  ResultType.NOT_FOUND);
        }
        return result;
    }
    private Result<AppUser> validate(String username, String password) {
        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.setMessages("username is required", ResultType.INVALID);
            return result;
        }

        if (password == null) {
            result.setMessages("password is required", ResultType.INVALID);
            return result;
        }

        if (username.length() > 50) {
            result.setMessages("username must be less than 50 characters", ResultType.INVALID);
        }

        if (!isValidPassword(password)) {
            result.setMessages("password must be at least 8 character and contain a digit," +
                    " a letter, and a non-digit/non-letter", ResultType.INVALID);
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }
}
