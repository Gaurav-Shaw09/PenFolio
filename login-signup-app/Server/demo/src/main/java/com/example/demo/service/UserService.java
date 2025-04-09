package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register user (save to DB)
    public User registerUser(User user) {
        return userRepository.save(user);
    }


    // ✅ Authenticate user manually (No Spring Security)
    public User authenticate(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent() && userOptional.get().getPassword().equals(password)) {
            return userOptional.get(); // ✅ Return user if credentials match
        }

        return null; // ❌ Invalid login
    }
}
