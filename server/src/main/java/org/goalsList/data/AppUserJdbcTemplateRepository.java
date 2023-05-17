package org.goalsList.data;

import org.goalsList.data.mappers.AppUserMapper;
import org.goalsList.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
import java.util.List;

public class AppUserJdbcTemplateRepository implements AppUserRepository{

    private final JdbcTemplate jdbcTemplate;
    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    @Transactional
    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sqlStatement = "select app_user_id, username, password_hash, enabled "
                + "from app_user "
                + "where username = ?;";
        return jdbcTemplate.query(sqlStatement, new AppUserMapper(roles), username)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public AppUser findByUserId(int appUserId) {
        List<String> roles = getRolesByUserId(appUserId);

        final String sqlStatement = "select app_user_id, username, password_hash, disabled "
                + "from app_user "
                + "where app_user_id = ?;";

        return jdbcTemplate.query(sqlStatement, new AppUserMapper(roles), appUserId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    @Transactional
    public AppUser createUser(AppUser user) {
        final String sqlStatement = "insert into app_user (username, password_hash) values (?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqlStatement, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        user.setAppUserId(keyHolder.getKey().intValue());

        updateRoles(user);

        return user;
    }

    @Override
    @Transactional
    public void updateUser(AppUser user) {

    }

    @Override
    @Transactional
    public boolean deleteUser(int appUserId) {
        return false;
    }


    private List<String> getRolesByUsername(String username){
        final String sqlStatement = "select r.name from app_role r "
                + "join app_user_role ur on r.app_role_id = ur.app_role_id "
                + "join app_user au on ur.app_user_id = au.app_user_id "
                + "where au.username = ?";
        return jdbcTemplate.query(sqlStatement, (rs, rowId) -> rs.getString("name"), username);
    }

    private List<String> getRolesByUserId(int userId){
        final String sqlStatement = "select r.name from app_role r "
                + "join app_user_role ur on r.app_role_id = ur.app_role_id "
                + "join app_user au on ur.app_user_id = au.app_user_id "
                + "where au.username = ?";
        return jdbcTemplate.query(sqlStatement, (rs, rowId) -> rs.getString("name"), userId);
    }

    private void updateRoles(AppUser user) {
        jdbcTemplate.update("delete from app_user_role where app_user_id = ?;", user.getAppUserId());

        Collection<GrantedAuthority> authorities = user.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (GrantedAuthority role : authorities) {
            String sqlStatement = "insert into app_user_role (app_user_id, app_role_id) "
                    + "select ?, app_role_id from app_role where `name` = ?;";
            jdbcTemplate.update(sqlStatement, user.getAppUserId(), role.getAuthority());
        }
    }
}
