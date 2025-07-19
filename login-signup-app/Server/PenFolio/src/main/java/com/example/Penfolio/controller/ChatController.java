package com.example.Penfolio.controller;

import com.example.Penfolio.dto.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class ChatController {

    @MessageMapping("/send") // client sends to /app/send
    @SendTo("/topic/messages") // broadcast to everyone subscribed to /topic/messages
    public ChatMessage sendMessage(ChatMessage message) {
        message.setTimestamp(new Date());
        return message; // You can also store it in DB here
    }
}
