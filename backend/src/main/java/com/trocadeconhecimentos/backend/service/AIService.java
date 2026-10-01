package com.trocadeconhecimentos.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AIService {

    @Value("${OPENAI_API_KEY:}")
    private String openAiApiKey;

    public IAInterpretacao interpretar(String texto) {
        if (texto == null || texto.isBlank()) {
            throw new IllegalArgumentException("O texto informado é obrigatório.");
        }

        String normalized = texto.toLowerCase();

        String categoria = "Tecnologia";
        if (normalized.contains("culin") || normalized.contains("comida") || normalized.contains("receita")) {
            categoria = "Culinária";
        } else if (normalized.contains("jardin") || normalized.contains("plantas")) {
            categoria = "Jardinagem";
        } else if (normalized.contains("artesanato") || normalized.contains("costura") || normalized.contains("marcenaria")) {
            categoria = "Artesanato";
        }

        List<String> interesses = new ArrayList<>();
        if (normalized.contains("computador") || normalized.contains("celular") || normalized.contains("tecnologia")) {
            interesses.add("Computador");
            interesses.add("Celular");
        }
        if (normalized.contains("cozinhar") || normalized.contains("culin") || normalized.contains("receita")) {
            interesses.add("Culinária");
        }
        if (interesses.isEmpty()) {
            interesses.add("Conhecimento prático");
        }

        String nivel = "Iniciante";
        if (normalized.contains("avancado") || normalized.contains("especializar") || normalized.contains("ensinar")) {
            nivel = "Avançado";
        } else if (normalized.contains("intermediario") || normalized.contains("melhorar") || normalized.contains("praticar")) {
            nivel = "Intermediário";
        }

        String tipo = normalized.contains("ensinar") || normalized.contains("ensino") ? "ENSINA" : "DESEJA_APRENDER";

        return new IAInterpretacao(categoria, interesses, nivel, tipo);
    }

    public record IAInterpretacao(String categoria, List<String> interesses, String nivel, String tipo) {}
}
