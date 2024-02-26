package com.example.forumproject.security;

import com.example.forumproject.bootstrap.UserBootstrap;
import com.example.forumproject.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService implements UserDetailsService {

    private final UserBootstrap userBootstrap;


    public CurrentUserService(UserBootstrap userBootstrap) {
        this.userBootstrap = userBootstrap;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userBootstrap.findUserByUsername(username);
        CurrentUser currentUser = new CurrentUser(user);
        return currentUser;
    }
}
