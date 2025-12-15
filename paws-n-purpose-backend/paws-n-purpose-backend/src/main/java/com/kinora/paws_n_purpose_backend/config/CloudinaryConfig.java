package com.kinora.paws_n_purpose_backend.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dfebdol5x");
        config.put("api_key", "361484924161581");
        config.put("api_secret", "dMXWsogeX3syjWC4f8l-TUm7qoA");
        config.put("secure", "true");
        return new Cloudinary(config);
    }
}
