const form = document.querySelector("#cadastro-form");

if (form) {
    const message = document.querySelector("#mensagem");
    const submitButton = form.querySelector("button[type=submit]");

    if (message && submitButton) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            message.textContent = "";
            message.classList.remove("success");

            const formData = new FormData(form);
            const senha = formData.get("senha");
            const confirmarSenha = formData.get("confirmar-senha");

            if (senha !== confirmarSenha) {
                message.textContent = "As senhas não conferem.";
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = "Criando conta...";

            try {
                const response = await fetch("/cadastro", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome: formData.get("nome"),
                        email: formData.get("email"),
                        senha
                    })
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.mensagem || "Não foi possível criar a conta.");
                }

                message.textContent = data.mensagem;
                message.classList.add("success");
                form.reset();
            } catch (error) {
                message.textContent = error.message;
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = "Criar conta";
            }
        });
    }
}