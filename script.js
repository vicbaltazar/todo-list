const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list  = document.getElementById("todo-list");

const pokemonImg  = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");

// linha de evolução da Gothitelle
const evolutionLine = ["gothita", "gothorita", "gothitelle"];
let currentStage = 0;       // começa em gothita
let xp = 0;
const XP_PER_EVOLUTION = 3; // quantas tarefas para evoluir

// busca o pokémon do estágio atual
async function fetchCurrentPokemon() {
  const name = evolutionLine[currentStage];
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    pokemonName.textContent = data.name.toUpperCase();
    pokemonImg.src = data.sprites.front_default || "";
    pokemonImg.alt = data.name;
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
  }
}

// ganha XP e verifica se evolui
async function gainXpAndMaybeEvolve() {
  xp += 1;

  if (xp >= XP_PER_EVOLUTION && currentStage < evolutionLine.length - 1) {
    xp = 0;
    currentStage += 1;
    await fetchCurrentPokemon();
  }
}

// inicializa com o primeiro estágio da linha
fetchCurrentPokemon();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addTodo(text);
  input.value = "";
});

function addTodo(text) {
  const li = document.createElement("li");
  li.classList.add("todo-item");

  const left = document.createElement("div");
  left.classList.add("todo-left");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.classList.add("todo-text");
  span.textContent = text;

  const xpSpan = document.createElement("span");
  xpSpan.classList.add("xp-text");
  xpSpan.textContent = "";

  left.appendChild(checkbox);
  left.appendChild(span);
  left.appendChild(xpSpan);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "✕";

  checkbox.addEventListener("change", async () => {
    const completed = checkbox.checked;
    li.classList.toggle("completed", completed);

    if (completed) {
      xpSpan.textContent = "Ganhou XP!";
      await gainXpAndMaybeEvolve();
    } else {
      xpSpan.textContent = "";
    }
  });

  deleteBtn.addEventListener("click", () => {
    list.removeChild(li);
  });

  li.appendChild(left);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}
