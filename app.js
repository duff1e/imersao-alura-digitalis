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