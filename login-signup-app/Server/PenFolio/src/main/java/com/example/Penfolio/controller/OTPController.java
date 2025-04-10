package com.example.Penfolio.controller;

import com.example.Penfolio.service.EmailService;
import com.example.Penfolio.dto.OTPRequest;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class OTPController {

    private final EmailService emailService;

    public OTPController(EmailService emailService) {
        this.emailService = emailService;
    }

    // ✅ Send OTP to email
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOTP(@RequestBody OTPRequest otpRequest) {
        try {
            emailService.sendOtpEmail(otpRequest.getEmail());
            return ResponseEntity.ok().body("{\"success\": true, \"message\": \"OTP sent successfully!\"}");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("{\"success\": false, \"message\": \"Error sending OTP.\"}");
        }
    }

    // ✅ Verify OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOTP(@RequestBody OTPRequest otpRequest) {
        boolean isValid = emailService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtp());
        if (isValid) {
            return ResponseEntity.ok().body("{\"success\": true, \"message\": \"OTP verified!\"}");
        } else {
            return ResponseEntity.status(400).body("{\"success\": false, \"message\": \"Invalid OTP!\"}");
        }
    }
}
