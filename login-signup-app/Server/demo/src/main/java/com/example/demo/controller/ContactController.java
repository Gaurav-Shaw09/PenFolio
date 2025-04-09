package com.example.demo.controller;

import com.example.demo.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.mail.MessagingException;

import java.util.Map;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:5173") // Adjust based on your frontend URL
public class ContactController {

    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> sendContactMessage(@RequestBody Map<String, String> request) throws MessagingException {
        String name = request.get("name");
        String email = request.get("email");
        String message = request.get("message");

        emailService.sendContactEmail(name, email, message);
        return ResponseEntity.ok("Message sent successfully!");
    }
}
