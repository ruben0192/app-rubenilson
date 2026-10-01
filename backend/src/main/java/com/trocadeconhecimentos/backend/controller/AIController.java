package com.trocadeconhecimentos.backend.controller;

import com.trocadeconhecimentos.backend.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/ia/interpretar")
    public ResponseEntity<Map<String, Object>> interpretar(@RequestBody Map<String, String> payload) {
        String texto = payload.getOrDefault("texto", "");
        AIService.IAInterpretacao interpretacao = aiService.interpretar(texto);

        return ResponseEntity.ok(Map.of(
                "categoria", interpretacao.categoria(),
                "interesses", interpretacao.interesses(),
                "nivel", interpretacao.nivel(),
                "tipo", interpretacao.tipo()
        ));
    }
}
