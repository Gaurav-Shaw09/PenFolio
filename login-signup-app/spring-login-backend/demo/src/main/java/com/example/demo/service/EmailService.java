package com.example.demo.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${mail.from}")
    private String senderEmail; // Sender's email (configured in application.properties)

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(String name, String email, String message) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setFrom(senderEmail);  // Your email
        helper.setTo(email);  // ✅ Send email to the user who entered their email
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
