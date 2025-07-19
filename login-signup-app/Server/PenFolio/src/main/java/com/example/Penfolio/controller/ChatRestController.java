package com.example.Penfolio.controller;

import com.example.Penfolio.entity.ChatMessageEntity;
import com.example.Penfolio.repository.ChatMessageRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin
public class ChatRestController {

    private final ChatMessageRepository messageRepository;

    public ChatRestController(ChatMessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @GetMapping("/{from}/{to}")
    public List<ChatMessageEntity> getMessages(@PathVariable String from, @PathVariable String to) {
        return messageRepository.findByFromAndToOrFromAndTo(from, to, to, from).stream()
                .sorted(Comparator.comparing(ChatMessageEntity::getTimestamp))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ChatMessageEntity saveMessage(@RequestBody ChatMessageEntity message) {
        message.setTimestamp(new java.util.Date());
        return messageRepository.save(message);
    }
}
