## **README.md**

### **Projeto: Plataforma de Inspiração para Desenhistas**

**Descrição:**

Este projeto tem como objetivo criar uma plataforma online que ofereça inspirações para desenhistas. A aplicação permite aos usuários buscar por imagens relacionadas a diferentes temas, como "inspiração", "referência" e "tutorial".

**Funcionalidades Principais:**

* **Busca por termos:** Os usuários podem pesquisar por termos específicos como "Inspiração" "Referência" ou "Tutorial" para encontrar imagens relacionadas que forneçam peso ao seu próximo desenho.
* **Sorteio de imagens:** A aplicação oferece a opção de sortear aleatoriamente imagens de acordo com o tema escolhido.
* **Visualização ampliada:** As imagens podem ser visualizadas em tela cheia para uma melhor análise.
* **Interface intuitiva:** A interface do usuário é simples e fácil de navegar, com foco na experiência do usuário, um ambiente "cozy" que por si só forneça inspiração.

**Tecnologias Utilizadas:**

* **HTML:** Estruturação da página.
* **CSS:** Estilização da página.
* **JavaScript:** Lógica da aplicação, interação com o usuário e manipulação do DOM.

**Estrutura do Projeto:**

* **index.html:** Página principal da aplicação.
* **style.css:** Arquivo CSS com as estilizações da página.
* **app.js:** Arquivo JavaScript com a lógica da aplicação.
* **dados.js:** Arquivo JavaScript com os dados das imagens.

**Como Usar:**

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/duff1e/imersao-alura-digitalis.git
   ```
2. **Abrir o projeto:**
   Abra o arquivo `index.html` em um navegador web.
3. **Interagir com a aplicação:**
   Utilize os botões para sortear imagens ou o campo de pesquisa para encontrar imagens específicas.

**Estrutura do Código:**

```javascript
const botoes = document.querySelectorAll(".botoes"); // Seleciona todos os botões com a classe "botoes"
const resultadosDiv = document.getElementById("resultados-div"); // Seleciona a div onde os resultados serão exibidos
const botaoFechar = document.querySelector(".svg-close"); // Seleciona o botão para fechar a imagem na tela de zoom
const inputPesquisa = document.querySelector('input[type="text"]'); // Seleciona o campo de input para pesquisa
const botaoPesquisar = document.querySelector('button[type="submit"]'); // Seleciona o botão de pesquisa
const termosPermitidos = ["inspiracao", "referencia", "tutorial"]; // Lista de termos que podem ser pesquisados

// Função para exibir as imagens correspondentes à tag fornecida
function exibirImagens(tag) {
    // Limpa a div de resultados para evitar duplicação
    resultadosDiv.innerHTML = "";
  
    // Itera sobre o array de imagens
    imagens.forEach(imagem => {
      // Verifica se a tag da imagem corresponde à tag buscada
      if (imagem.tags === tag) {
        // Cria os elementos HTML para exibir a imagem e suas informações
            const galeria = document.createElement("div");
            galeria.classList.add("galeria");

            const titulo = document.createElement("h2");
            titulo.textContent = imagem.titulo;

            const galeriaFlex = document.createElement("div");
            galeriaFlex.classList.add("galeria-flex", "flexbox-div", "centered", "zoom-container");

            const img = document.createElement("img");
            img.src = imagem.url[Math.floor(Math.random() * imagem.url.length)];
            img.classList.add("img-resultado");
            img.alt = "Imagem aleatória"; // Adiciona um atributo alt para acessibilidade

            const centerMore = document.createElement("div");
            centerMore.classList.add("centerMore");
            const link = document.createElement("a");
            link.href = imagem.link;
            link.textContent = "Mais";
            centerMore.appendChild(link);

            galeriaFlex.appendChild(img);
            galeriaFlex.appendChild(centerMore);
            galeria.appendChild(titulo);
            galeria.appendChild(galeriaFlex);

            resultadosDiv.appendChild(galeria);
        }
    });
}

// Adiciona um ouvinte de evento para cada botão
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        // Obtém a tag a partir do texto do botão
        const tag = botao.textContent.toLowerCase();
        // Exibe as imagens correspondentes à tag
        exibirImagens(tag);
        // Foca na div de resultados para uma melhor experiência do usuário
        resultadosDiv.focus();
    });
});


// Adiciona um ouvinte de evento para o modal de zoom
resultadosDiv.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
        const zoomContainer = event.target.closest(".zoom-container");
        const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
        zoomContainer.classList.toggle("zoom");
        fullscreenOverlay.style.display = zoomContainer.classList.contains("zoom") ? "flex" : "none";
        resultadosDiv.focus();
    }
});

// Adiciona um ouvinte de evento para o botão de fechar o zoom
botaoFechar.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
        const zoomContainer = event.target.closest(".zoom-container");
        const fullscreenOverlay = document.querySelector(".fullscreen-overlay");
        zoomContainer.classList.toggle("zoom");
        fullscreenOverlay.style.display = zoomContainer.classList.contains("zoom") ? "flex" : "none";
    }
});

// Função para normalizar o texto (remover acentos e converter para minúsculo)
function normalizarTexto(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Função para realizar a pesquisa
function pesquisar(termo) {
    // Normaliza o termo de pesquisa
    const termoNormalizado = normalizarTexto(termo);
    // Filtra as imagens que possuem a tag correspondente
    const resultados = imagens.filter(imagem => normalizarTexto(imagem.tags) === termoNormalizado);

    // Verifica se o termo é válido e se foram encontrados resultados
    if (termosPermitidos.includes(termoNormalizado)) {
        if (resultados.length > 0) {
            // Seleciona uma imagem aleatória dos resultados e exibe
            const resultadoAleatorio = resultados[Math.floor(Math.random() * resultados.length)];
            exibirImagens(resultadoAleatorio.tags);
        } else {
            alert("Nenhum resultado encontrado.");
        }
    } else {
        alert("Por favor, digite um termo de pesquisa válido: 'Inspiração', 'Referência' ou 'Tutorial'");
    }
}

// Adiciona um ouvinte de evento ao botão de pesquisa
botaoPesquisar.addEventListener('click', () => {
    // Obtém o termo de pesquisa do input
    const termoPesquisa = inputPesquisa.value;
    // Realiza a pesquisa
    pesquisar(termoPesquisa);
    // Limpa o campo de input
    limpaInput();
});


// Função para limpar o campo de input
function limpaInput() {
    inputPesquisa.value = "";
}
```

**Explicação do Código:**

* **Seleção de elementos:** Seleciona os elementos HTML necessários para a interação com o usuário.
* **Função `exibirImagens`:** Responsável por exibir as imagens correspondentes à tag fornecida.
* **Eventos de clique:** Adiciona ouvintes de eventos aos botões para acionar as funcionalidades da aplicação.
* **Pesquisa:** Implementa a funcionalidade de pesquisa, filtrando as imagens de acordo com o termo pesquisado. Também faz a conversão da palavra digitada para dar match aos termos, retirando maiúsculas e acentos.
* **Modal de zoom:** Permite que o usuário visualize as imagens em tela cheia.


**Considerações:**

* **Banco de dados:** Atualmente, as imagens são armazenadas em um array JavaScript. Para aplicações maiores, seria interessante utilizar um banco de dados para armazenar as imagens. Quem sabe num futuro?
* **Possíveis melhorias:** A aplicação pode ser aprimorada com novas funcionalidades, como:
    * **Favoritos:** Permitindo que os usuários marquem suas imagens favoritas.
    * **Upload de imagens:** Permitindo que os usuários enviem suas próprias imagens.
    * **Categorias:** Adicionar categorias para facilitar a busca por imagens.

**Contribuições:**

Contribuições são bem-vindas! Se você encontrar algum bug ou tiver alguma sugestão de melhoria, por favor, abra um issue ou faça um pull request. Embora a ideia do projeto seja manter algo simples, nada impede que eu o melhore no futuro.

**Agradecimentos:**

Agradeço aos professores da Imersão Alura e a todos no Discord pelos feedbacks.