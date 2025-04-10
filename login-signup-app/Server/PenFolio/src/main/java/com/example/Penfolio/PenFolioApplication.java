package com.example.Penfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class}) // Exclude DataSource auto-config
public class PenFolioApplication {
	public static void main(String[] args) {
		SpringApplication.run(PenFolioApplication.class, args);
	}
}
