const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

const pokemonImg = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");

// contador de XP (ou tarefas concluídas)
let xp = 0;
// limite de pokémon para evitar ids inválidos (primeira geração, por exemplo)
const MAX_POKEMON_ID = 151;

// função que busca um pokémon na PokéAPI com base no "xp"
async function fetchPokemonByXp() {
  // usa o xp para gerar um id entre 1 e MAX_POKEMON_ID
  const id = (xp % MAX_POKEMON_ID) || 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  try {
    const response = await fetch(url);
    const data = await response.json(); // contém name e sprites[web:40][web:47]

    pokemonName.textContent = data.name.toUpperCase();
    pokemonImg.src = data.sprites.front_default || "";
    pokemonImg.alt = data.name;
  } catch (error) {
    console.error("Erro ao buscar Pokémon:", error);
  }
}

// inicializa com algum pokémon usando xp = 0 -> id 1 (bulbasaur)
fetchPokemonByXp();

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

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.classList.add("todo-text");
  span.textContent = text;

  const xpSpan = document.createElement("span");
  xpSpan.classList.add("xp-text");
  xpSpan.textContent = ""; // vazio até concluir

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "✕";

  checkbox.addEventListener("change", async () => {
    const completed = checkbox.checked;
    li.classList.toggle("completed", completed);

    if (completed) {
      // marca a tarefa como "ganhou XP"
      xpSpan.textContent = "Ganhou XP!";
      xp += 1;
      await fetchPokemonByXp(); // muda sprite e nome com base no novo xp[web:42][web:47]
    } else {
      // se desmarcar, você pode decidir o que fazer (aqui tira o texto e não decrementa XP)
      xpSpan.textContent = "";
    }
  });

  deleteBtn.addEventListener("click", () => {
    list.removeChild(li);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(xpSpan);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}
