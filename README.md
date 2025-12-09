Poké To-Do List 🧾✨
Uma lista de tarefas para treinadores Pokémon: cada missão concluída rende XP e faz sua Gothita evoluir até virar uma poderosa Gothitelle!

Repositório: vicbaltazar/todo-list

🧪 Sobre o projeto
O Poké To-Do List é uma aplicação em HTML, CSS e JavaScript que transforma suas tarefas diárias em missões de treinador Pokémon.
Ao concluir tarefas, você ganha XP e faz a linha evolutiva da Gothitelle avançar (Gothita → Gothorita → Gothitelle), consumindo dados em tempo real da PokéAPI para atualizar nome e sprite do Pokémon.​

🧰 Tecnologias utilizadas
HTML5

CSS3

JavaScript (Vanilla)

PokéAPI – consumo via fetch no endpoint /pokemon.​

🎮 Mecânica de jogo
Cada item adicionado é uma missão de treinador.

Ao marcar uma missão como concluída:

a tarefa recebe o rótulo “Ganhou XP!”

um contador de XP interno é incrementado

Quando o XP atinge o limite definido:

o estágio da evolução avança dentro da cadeia Gothita → Gothorita → Gothitelle

o app faz uma nova requisição à PokéAPI para buscar o sprite e o nome do novo Pokémon.​

🕹️ Como executar
Clone o repositório:

bash
git clone https://github.com/vicbaltazar/todo-list.git
Entre na pasta do projeto:

bash
cd todo-list
Abra o arquivo index.html no navegador (duplo clique ou “Open with Live Server” no VS Code).

Digite uma missão de treinador, clique em Adicionar e marque as tarefas como concluídas para ganhar XP e evoluir seu Pokémon.

📁 Estrutura
index.html – Estrutura da interface (card principal, área do Pokémon, formulário e lista).

style.css – Tema visual com cores inspiradas no universo Pokémon e layout responsivo básico.

script.js – Lógica da to‑do list, contagem de XP, regra de evolução e integração com a PokéAPI.​
