package com.example.Penfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String senderEmail; // Sender's email (configured in application.properties)

    // Store OTPs temporarily (for simplicity, use Redis in production)
    private final ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // ✅ Function to send OTP to the user during signup
    public void sendOtpEmail(String email) throws MessagingException {
        String otp = generateOtp();
        otpStorage.put(email, otp); // Store OTP for verification

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setFrom(senderEmail);
        helper.setTo(email);
        helper.setSubject("Your OTP for Account Verification");
        helper.setText("Dear User,\n\n" +
                "Your One-Time Password (OTP) for account verification is: " + otp + "\n\n" +
                "This OTP is valid for 10 minutes.\n\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "Best regards,\n" +
                "Team Gaurav", false);

        mailSender.send(mimeMessage);
    }

    // ✅ Function to verify OTP
    public boolean verifyOtp(String email, String otp) {
        String storedOtp = otpStorage.get(email);
        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(email); // Remove OTP after verification
            return true;
        }
        return false;
    }

    // ✅ Function to generate a 6-digit OTP
    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    // ✅ Function to send a contact email
    public void sendContactEmail(String name, String email, String message) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setFrom(senderEmail);
        helper.setTo(email);
        helper.setSubject("Thank You for Contacting Us, " + name + "!");
        helper.setText("Dear " + name + ",\n\n" +
                "Thank you for reaching out to us! We have received your message:\n\n" +
                "\"" + message + "\"\n\n" +
                "We will get back to you as soon as possible.\n\n" +
                "📞 Contact Us:\n" +
                "📧 Email: gauravshaw64@gmail.com\n" +
                "📞 Phone: 8777326576\n" +
                "🕒 Available: Monday to Friday, 9 AM - 5 PM\n\n" +
                "Best regards,\n" +
                "From Mr. Gaurav", false);

        mailSender.send(mimeMessage);
    }
}
