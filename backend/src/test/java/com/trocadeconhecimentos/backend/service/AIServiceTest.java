package com.trocadeconhecimentos.backend.service;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class AIServiceTest {

    private final AIService service = new AIService();

    @Test
    void rejectsBlankText() {
        assertThatThrownBy(() -> service.interpretar("  "))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("O texto informado é obrigatório.");
    }

    @Test
    void classifiesTechnologyAndTeachingAsAdvanced() {
        AIService.IAInterpretacao result = service.interpretar(
                "Quero ensinar tecnologia usando computador e celular");

        assertThat(result.categoria()).isEqualTo("Tecnologia");
        assertThat(result.interesses()).containsExactly("Computador", "Celular");
        assertThat(result.nivel()).isEqualTo("Avançado");
        assertThat(result.tipo()).isEqualTo("ENSINA");
    }

    @Test
    void classifiesCookingAndIntermediateLearning() {
        AIService.IAInterpretacao result = service.interpretar(
                "Quero cozinhar receitas e praticar");

        assertThat(result.categoria()).isEqualTo("Culinária");
        assertThat(result.interesses()).containsExactly("Culinária");
        assertThat(result.nivel()).isEqualTo("Intermediário");
        assertThat(result.tipo()).isEqualTo("DESEJA_APRENDER");
    }

    @Test
    void classifiesGardeningAndUsesFallbackInterest() {
        AIService.IAInterpretacao result = service.interpretar("Gosto de plantas e jardinagem");

        assertThat(result.categoria()).isEqualTo("Jardinagem");
        assertThat(result.interesses()).containsExactly("Conhecimento prático");
        assertThat(result.nivel()).isEqualTo("Iniciante");
        assertThat(result.tipo()).isEqualTo("DESEJA_APRENDER");
    }

    @Test
    void classifiesCraftInterests() {
        AIService.IAInterpretacao result = service.interpretar("Quero aprender artesanato");

        assertThat(result.categoria()).isEqualTo("Artesanato");
        assertThat(result.interesses()).containsExactly("Conhecimento prático");
    }
}
