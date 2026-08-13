package com.monkey.areas.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@ApplicationScoped
public class TurnstileVerifier {
    @ConfigProperty(name = "app.turnstile.secret") Optional<String> secret;
    @Inject ObjectMapper mapper;

    public boolean verify(String token) {
        if (secret.isEmpty() || secret.get().isBlank()) return true;
        if (token == null || token.isBlank()) return false;
        try {
            String body = "secret=" + encode(secret.orElseThrow()) + "&response=" + encode(token);
            HttpRequest request = HttpRequest.newBuilder(URI.create("https://challenges.cloudflare.com/turnstile/v0/siteverify"))
                    .header("Content-Type", "application/x-www-form-urlencoded")
                    .POST(HttpRequest.BodyPublishers.ofString(body)).build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            JsonNode json = mapper.readTree(response.body());
            return response.statusCode() == 200 && json.path("success").asBoolean(false);
        } catch (Exception ignored) {
            return false;
        }
    }

    private static String encode(String value) { return URLEncoder.encode(value, StandardCharsets.UTF_8); }
}
