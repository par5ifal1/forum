package com.example.forumproject.controllers;

import com.example.forumproject.bootstrap.UserBootstrap;
import com.example.forumproject.dto.LoginDTO;
import com.example.forumproject.dto.SessionDTO;
import com.example.forumproject.models.User;
import com.example.forumproject.session.SessionRegistry;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/user")
@RestController
public class UserController {

    private final UserBootstrap userBootstrap;
    private final AuthenticationManager authenticationManager;
    private final SessionRegistry sessionRegistry;


    public UserController(UserBootstrap userBootstrap, AuthenticationManager authenticationManager, SessionRegistry sessionRegistry) {
        this.userBootstrap = userBootstrap;
        this.authenticationManager = authenticationManager;
        this.sessionRegistry = sessionRegistry;
    }

    @PostMapping("/login")
    public ResponseEntity<SessionDTO> logIn(@RequestBody LoginDTO login){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
        final String sessionId = sessionRegistry.registerSession(login.getUsername());
        SessionDTO res = new SessionDTO();
        res.setSessionId(sessionId);

        return new ResponseEntity<SessionDTO>(res, HttpStatus.OK);
    }

    @GetMapping("/session")
    public ResponseEntity<User> getUserBySession(@RequestHeader(HttpHeaders.AUTHORIZATION) String session){
        User user = userBootstrap.findUserByUsername(sessionRegistry.getUsernameFromSession(session));
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<List<User>>(userBootstrap.findAll(), HttpStatus.OK);
    }

    @PostMapping("/new")
    public ResponseEntity<User> createUser(@RequestBody User user){
        return new ResponseEntity<User>(this.userBootstrap.save(user), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@RequestBody User User, @PathVariable("id") Long id,
                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String sessionId){
        if(!id.equals(userBootstrap.findUserByUsername(sessionRegistry.getUsernameFromSession(sessionId)).getId())){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        User.setId(id);
        return new ResponseEntity<User>(this.userBootstrap.save(User), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable("username")String username,
                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String sessionId){
        if(!username.equals(sessionRegistry.getUsernameFromSession(sessionId))){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        userBootstrap.delete(username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
