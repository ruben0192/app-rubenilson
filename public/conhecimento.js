const people = [
  { name: "Ana Ribeiro", age: 64, city: "Aracaju", teaches: "culinária regional", learns: "fotografia", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=85", match: 94 },
  { name: "João Batista", age: 71, city: "São Cristóvão", teaches: "marcenaria", learns: "usar o celular", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85", match: 89 },
  { name: "Célia Santos", age: 59, city: "Lagarto", teaches: "costura criativa", learns: "jardinagem", photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=85", match: 86 },
  { name: "Paulo Menezes", age: 66, city: "Aracaju", teaches: "violão", learns: "culinária", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=85", match: 82 },
  { name: "Lúcia Ferreira", age: 62, city: "Itabaiana", teaches: "jardinagem", learns: "fotografia", photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=500&q=85", match: 79 },
  { name: "Roberto Alves", age: 73, city: "Nossa Senhora do Socorro", teaches: "reparos domésticos", learns: "internet", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85", match: 77 }
];
const initialSkills = [
  { title: "Receitas de família", type: "ensinar", detail: "Comida simples, feita com afeto." },
  { title: "Histórias de Sergipe", type: "ensinar", detail: "Memórias e costumes da nossa região." },
  { title: "Fotografia pelo celular", type: "aprender", detail: "Quero registrar melhor os momentos." }
];
const readStore = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const writeStore = (key, value) => localStorage.setItem(key, JSON.stringify(value));
let filter = "todos";
let authMode = "login";
let toastTimer;
const authModal = document.querySelector("#auth-modal");
const authForm = document.querySelector("#auth-form");
const safe = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const connectionData = () => readStore("conhecimento50:conexoes", []);
function notify(message) { const toast = document.querySelector("#toast"); toast.textContent = message; toast.classList.add("visible"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("visible"), 3000); }
function personCard(person) {
  const invited = connectionData().includes(person.name);
  return `<article class="person-card"><div class="person-photo"><img src="${person.photo}" alt="${safe(person.name)}, ${person.age} anos"><span class="online"></span></div><div class="person-details"><div class="person-meta"><span class="person-city">${safe(person.city.toUpperCase())}, SE</span><span class="match">${person.match}% afinidade</span></div><h3>${safe(person.name)} <span>${person.age}</span></h3><p>Ensina <b>${safe(person.teaches)}</b> · Quer aprender ${safe(person.learns)}</p><button class="connect ${invited ? "sent" : ""}" data-connect="${safe(person.name)}" ${invited ? "disabled" : ""}>${invited ? "Convite enviado" : "Propor uma troca"}<span>${invited ? "✓" : "↗"}</span></button></div></article>`;
}
function renderPeople() {
  const term = (document.querySelector("#search")?.value || "").trim().toLocaleLowerCase("pt-BR");
  const list = people.filter(person => {
    const searchAll = `${person.name} ${person.city} ${person.teaches} ${person.learns}`.toLocaleLowerCase("pt-BR");
    const field = filter === "ensinar" ? person.teaches : filter === "aprender" ? person.learns : searchAll;
    return field.toLocaleLowerCase("pt-BR").includes(term);
  });
  document.querySelector("#home-people").innerHTML = people.slice(0, 3).map(personCard).join("");
  document.querySelector("#all-people").innerHTML = list.map(personCard).join("");
  document.querySelector("#search-empty").hidden = list.length > 0;
  document.querySelectorAll(".filter").forEach(button => button.classList.toggle("active", button.dataset.filter === filter));
}
function renderSkills() {
  const skills = readStore("conhecimento50:saberes", initialSkills);
  for (const type of ["ensinar", "aprender"]) {
    const target = document.querySelector(type === "ensinar" ? "#teach-list" : "#learn-list");
    const chosen = skills.filter(skill => skill.type === type);
    target.innerHTML = chosen.length ? chosen.map(skill => `<article class="knowledge-card ${type === "aprender" ? "learning" : ""}"><span>${type === "ensinar" ? "✳" : "＋"}</span><div><h3>${safe(skill.title)}</h3><p>${safe(skill.detail || "Disponível para uma nova troca.")}</p></div></article>`).join("") : "<p class=empty>Adicione um conhecimento para começar.</p>";
  }
}
function renderConnections() {
  const names = connectionData();
  document.querySelector("#connection-count").textContent = names.length;
  document.querySelector("#connections-empty").hidden = names.length > 0;
  document.querySelector("#connections").innerHTML = names.map(name => `<article class="connection-card"><span class="connection-avatar">${safe(name[0])}</span><div><strong>${safe(name)}</strong><small>Convite enviado · aguardando resposta</small></div><span>PENDENTE</span></article>`).join("");
}
function setScreen(name) {
  const current = document.querySelector(`#screen-${name}`);
  if (!current) return;
  document.querySelectorAll(".screen").forEach(screen => { screen.classList.toggle("active", screen === current); screen.hidden = screen !== current; });
  document.querySelectorAll(".nav-link").forEach(button => button.classList.toggle("active", button.dataset.screen === name));
  document.querySelector("#breadcrumb").textContent = ({ inicio: "Início", buscar: "Encontrar pessoas", saberes: "Meus conhecimentos", assistente: "Assistente inteligente", conexoes: "Conexões" })[name];
  document.querySelector("#sidebar").classList.remove("open");
  document.querySelector(".menu-button").setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (name === "buscar") renderPeople();
  if (name === "saberes") renderSkills();
  if (name === "conexoes") renderConnections();
}
function setAuthMode(mode) {
  authMode = mode;
  const registering = mode === "register";
  document.querySelector("#auth-title").textContent = registering ? "Faça parte da comunidade" : "Entre para a comunidade";
  document.querySelector("#auth-copy").textContent = registering ? "Crie seu acesso e comece uma nova troca." : "Compartilhe sua experiência e encontre novos aprendizados.";
  document.querySelector("#auth-submit").textContent = registering ? "Criar minha conta" : "Entrar";
  for (const id of ["name-row", "birth-row", "location-row"]) document.querySelector(`#${id}`).hidden = !registering;
  document.querySelectorAll(".auth-tabs button").forEach(button => button.classList.toggle("selected", button.dataset.mode === mode));
  document.querySelector("#auth-message").textContent = "";
}
function ageAt(date) {
  const birth = new Date(`${date}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return 0;
  const now = new Date(); let age = now.getFullYear() - birth.getFullYear();
  if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())) age--;
  return age;
}
function updateUser(name) {
  document.querySelector("#first-name").textContent = name.trim().split(/\s+/)[0];
  document.querySelector("#profile-name").textContent = name;
  document.querySelector("#avatar").textContent = name.trim()[0].toUpperCase();
}

document.addEventListener("click", event => {
  const screenButton = event.target.closest("[data-screen]"); if (screenButton) setScreen(screenButton.dataset.screen);
  const openButton = event.target.closest("[data-open]"); if (openButton) { if (openButton.dataset.open === "auth") setAuthMode(openButton.dataset.mode || "login"); document.querySelector(`#${openButton.dataset.open}-modal`).showModal(); }
  const modeButton = event.target.closest("[data-mode]"); if (modeButton) setAuthMode(modeButton.dataset.mode);
  const closeButton = event.target.closest("[data-close]"); if (closeButton) closeButton.closest("dialog").close();
  const filterButton = event.target.closest("[data-filter]"); if (filterButton) { filter = filterButton.dataset.filter; renderPeople(); }
  const invite = event.target.closest("[data-connect]");
  if (invite && !invite.disabled) { writeStore("conhecimento50:conexoes", [...connectionData(), invite.dataset.connect]); renderConnections(); renderPeople(); notify(`Convite enviado para ${invite.dataset.connect}.`); }
});
document.querySelector(".menu-button").addEventListener("click", event => { const open = document.querySelector("#sidebar").classList.toggle("open"); event.currentTarget.setAttribute("aria-expanded", String(open)); });
document.querySelector("#search").addEventListener("input", renderPeople);
document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }));

authForm.addEventListener("submit", async event => {
  event.preventDefault(); const values = new FormData(authForm); const message = document.querySelector("#auth-message"); const submit = document.querySelector("#auth-submit");
  message.classList.remove("success");
  if (authMode === "register" && ageAt(values.get("nascimento")) < 50) { message.textContent = "A comunidade é destinada a pessoas com 50 anos ou mais."; return; }
  submit.disabled = true; submit.textContent = "Aguarde...";
  try {
    const response = await fetch(authMode === "register" ? "/cadastro" : "/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nome: values.get("nome"), email: values.get("email"), senha: values.get("senha") }) });
    const result = await response.json(); if (!response.ok) throw new Error(result.mensagem || "Não foi possível concluir o acesso.");
    if (authMode === "register") { setAuthMode("login"); document.querySelector("#auth-message").textContent = "Conta criada. Entre com seu e-mail e senha."; document.querySelector("#auth-message").classList.add("success"); authForm.reset(); return; }
    if (result.token) localStorage.setItem("conhecimento50:token", result.token);
    const name = result.usuario?.nome || values.get("email").split("@")[0]; writeStore("conhecimento50:usuario", { name }); updateUser(name); authModal.close(); authForm.reset(); notify(`Bem-vindo(a), ${name}!`);
  } catch (error) { message.textContent = error.message || "Não foi possível conectar ao servidor."; }
  finally { submit.disabled = false; submit.textContent = authMode === "register" ? "Criar minha conta" : "Entrar"; }
});
document.querySelector("#knowledge-form").addEventListener("submit", event => {
  event.preventDefault(); const values = new FormData(event.currentTarget); const skills = readStore("conhecimento50:saberes", initialSkills);
  skills.unshift({ title: values.get("titulo").trim(), type: values.get("tipo"), detail: values.get("detalhe").trim() });
  writeStore("conhecimento50:saberes", skills); event.currentTarget.reset(); document.querySelector("#knowledge-modal").close(); renderSkills(); notify("Conhecimento adicionado ao seu perfil.");
});

function interpretLocally(text) {
  const normalized = text.toLocaleLowerCase("pt-BR");
  let categoria = "Tecnologia";
  if (/culin|comida|receita|cozinhar/.test(normalized)) categoria = "Culinária";
  else if (/jardin|plantas|horta/.test(normalized)) categoria = "Jardinagem";
  else if (/artesanato|costura|marcenaria/.test(normalized)) categoria = "Artesanato";
  const interesses = [];
  if (/computador|celular|tecnologia|internet/.test(normalized)) interesses.push("Tecnologia", "Celular");
  if (/cozinhar|culin|receita|comida/.test(normalized)) interesses.push("Culinária");
  if (/jardin|plantas|horta/.test(normalized)) interesses.push("Jardinagem");
  if (interesses.length === 0) interesses.push("Conhecimento prático");
  const nivel = /avancad|avançad|especializar|ensinar/.test(normalized) ? "Avançado" : /intermediario|intermediário|melhorar|praticar/.test(normalized) ? "Intermediário" : "Iniciante";
  const tipo = /ensinar|ensino|compartilhar/.test(normalized) ? "ENSINA" : "DESEJA_APRENDER";
  return { categoria, interesses: [...new Set(interesses)], nivel, tipo };
}

function showAIResult(result, source) {
  document.querySelector("#ai-result").hidden = false;
  document.querySelector("#ai-source").textContent = source;
  document.querySelector("#ai-category").textContent = result.categoria;
  document.querySelector("#ai-interests").textContent = result.interesses.join(", ");
  document.querySelector("#ai-level").textContent = result.nivel;
  document.querySelector("#ai-type").textContent = result.tipo === "ENSINA" ? "Pode ensinar" : "Quer aprender";
  document.querySelector("#ai-summary").textContent = result.tipo === "ENSINA" ? "Seu conhecimento pode virar uma boa troca." : "Já temos um ponto de partida para sua busca.";
}

document.querySelector("#ai-form").addEventListener("submit", async event => {
  event.preventDefault();
  const text = document.querySelector("#ai-text").value.trim();
  const button = document.querySelector("#ai-submit");
  const resultPanel = document.querySelector("#ai-result");
  if (!text) return;
  button.disabled = true;
  button.textContent = "Analisando...";
  resultPanel.hidden = true;
  try {
    const response = await fetch("http://localhost:8080/api/ia/interpretar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: text })
    });
    if (!response.ok) throw new Error("Serviço de análise indisponível.");
    showAIResult(await response.json(), "Interpretação do serviço Conhecimento +50");
  } catch {
    showAIResult(interpretLocally(text), "Demonstração local: backend de IA indisponível");
  } finally {
    button.disabled = false;
    button.innerHTML = "Interpretar descrição <span>✧</span>";
  }
});

const savedUser = readStore("conhecimento50:usuario", null); if (savedUser?.name) updateUser(savedUser.name);
renderPeople(); renderSkills(); renderConnections();
