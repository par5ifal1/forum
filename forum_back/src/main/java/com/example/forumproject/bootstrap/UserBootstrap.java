package com.example.forumproject.bootstrap;

import com.example.forumproject.models.User;
import com.example.forumproject.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Component
public class UserBootstrap {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserBootstrap(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    public User findUserByUsername(String username){
        List<User> users = userRepository.findAll();
        Optional<User> user = users.stream().filter(x -> username.equals(x.getUsername())).findFirst();
        if(user.isPresent()){
            return user.get();
        }else{
            throw new UsernameNotFoundException("User with such name doesn't exist");
        }
    }

    @Transactional
    public User save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    public List<User> findAll(){
        return userRepository.findAll();
    }

    @Transactional
    public void delete(String username){
        userRepository.delete(this.findUserByUsername(username));
    }

    @Transactional
    public void update(User user, Long id){
        user.setId(id);
        userRepository.save(user);
    }
}
