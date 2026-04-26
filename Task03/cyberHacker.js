//declaracao de variaveis globais 
let score = 0; // "let" = o valor pode ser alterado posteriormente
let gameInterval;
const target = document.getElementById('target'); 
const scoreDisplay = document.getElementById('score'); // "document.getElementById" = "ponteiro para endereco de memoria", no conceito puro


function startGame() {
    // Esconder header e mostrar o main
    document.querySelector('header').style.display = 'none'; // "document.querySelector" = seleciona o primeiro elemento que corresponde ao seletor CSS
    document.querySelector('main').style.display = 'block'; // "style.display" = propriedade CSS para controlar a exibição de um elemento

    // Iniciar o jogo
    moveTarget();
    gameInterval = setInterval(moveTarget, 2000); // "setInterval" = executa uma função repetidamente, com um intervalo de tempo fixo entre cada execução (em ms)

    // Iniciar o cronometro
    gameInterval = setTimeout(endGame, 30000); // "setTimeout" = executa uma função após um determinado tempo (em ms)
}

function upScore () {
    score++;
    scoreDisplay.textContent = score; // basicamente um "output" que limpa o valor anterior 
    moveTarget();
}

function moveTarget(){
    //calculo para evitar o alvo fora da tela
    const maxX = window.innerWidth - target.offsetWidth; // "window.innerWidth" = largura da janela, "target.offsetWidth" = largura do alvo
    const maxY = window.innerHeight - target.offsetHeight; // "window.innerHeight" = altura da janela, "target.offsetHeight" = altura do alvo

    // Gerar cordenados aleatórias
    const randomX = Math.floor(Math.random() * maxX); // "Math.floor" arredonda para um num int mais proximo
    const randomY = Math.floor(Math.random() * maxY); // "Math.random()" gera um num decimal aleatorio >= 0 x < 1

    // Aplica ao CSS do alvo
    target.style.left = `${randomX}px`; // "`&{randomX}px`" = concatenacao de um valor e uma string (px)
    target.style.top = `${randomY}px`;
}