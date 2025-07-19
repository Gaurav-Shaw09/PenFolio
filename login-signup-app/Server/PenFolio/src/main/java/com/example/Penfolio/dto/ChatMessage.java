package com.example.Penfolio.dto;

import java.util.Date;

public class ChatMessage {
    private String from;
    private String to;
    private String text;
    private Date timestamp;

    // Getters & setters
    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }

    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public Date getTimestamp() { return timestamp; }
    public void setTimestamp(Date timestamp) { this.timestamp = timestamp; }
}
