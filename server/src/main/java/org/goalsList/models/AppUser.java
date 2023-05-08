package org.goalsList.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class AppUser implements UserDetails {

    private String username;
    private String password;
    private boolean disabled;
    private final Collection<GrantedAuthority> authorities;

    public AppUser(String username, String password, boolean disabled, Collection<GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.disabled = disabled;
        this.authorities = authorities;
    }

    public AppUser(String username, String password, boolean disabled, List<String> roles) {
        this(username, password, disabled, convertRolesToAuthorities(roles));
    }
    private static Collection<GrantedAuthority> convertRolesToAuthorities(List<String> roles){
        return roles.stream()
                .map(r -> new SimpleGrantedAuthority(r))
                .collect(Collectors.toList());
    }
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return new ArrayList<>(authorities);
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return disabled;
    }

    public void setEnabled(boolean enabled) {
        this.disabled = enabled;
    }
}
