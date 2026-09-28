// =========================================
// MENU MOBILE
// =========================================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


// Fecha o menu quando clicar em algum link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

    });

});


// =========================================
// ANIMAÇÃO AO APARECER NA TELA
// =========================================

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.12
    }
);


// Seleciona todos os elementos com reveal

document.querySelectorAll(".reveal").forEach(element => {

    observer.observe(element);

});


// =========================================
// ANO AUTOMÁTICO DO FOOTER
// =========================================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


// =========================================
// EFEITO DE LUZ DO MOUSE
// =========================================

const cursorGlow =
    document.querySelector(".cursor-glow");


// Só executa se o elemento existir

if (cursorGlow) {

    window.addEventListener("mousemove", (event) => {

        cursorGlow.style.left =
            `${event.clientX}px`;

        cursorGlow.style.top =
            `${event.clientY}px`;

    });

}


// =========================================
// SCROLL SUAVE
// =========================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


// =========================================
// EFEITO NO HEADER DURANTE O SCROLL
// =========================================

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) {
        return;
    }


    if (window.scrollY > 50) {

        header.style.background =
            "rgba(7, 9, 12, 0.92)";

    } else {

        header.style.background =
            "rgba(7, 9, 12, 0.75)";

    }

});


// =========================================
// ANIMAÇÃO DAS BARRAS DE TECNOLOGIA
// =========================================

const meters =
    document.querySelectorAll(".meter i");


const meterObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const width =
                        entry.target.style.width;

                    entry.target.style.width = "0%";


                    setTimeout(() => {

                        entry.target.style.width =
                            width;

                    }, 150);

                }

            });

        },
        {
            threshold: 0.5
        }
    );


meters.forEach(meter => {

    meterObserver.observe(meter);

});


// =========================================
// TERMINAL - EFEITO DE DIGITAÇÃO
// =========================================

const terminalCursor =
    document.querySelector(".blink");


if (terminalCursor) {

    setInterval(() => {

        terminalCursor.style.opacity =
            terminalCursor.style.opacity === "0"
                ? "1"
                : "0";

    }, 500);

}


// =========================================
// ESC DO MENU MOBILE
// =========================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        navLinks.classList.remove("open");

    }

});


// =========================================
// AVISO ANTES DE SAIR PARA LINKS EXTERNOS
// =========================================

document
    .querySelectorAll('a[target="_blank"]')
    .forEach(link => {

        link.addEventListener("click", () => {

            console.log(
                "Abrindo:",
                link.href
            );

        });

    });


// =========================================
// LOG DO PORTFÓLIO
// =========================================

console.log(
    "%cRubenilson Júnior",
    "color:#72f5a0;font-size:20px;font-weight:bold;"
);

console.log(
    "Portfólio carregado com sucesso 🚀"
);