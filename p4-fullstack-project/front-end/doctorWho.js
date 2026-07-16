// atribuindo elementos a variaveis para manipulacao via DOM
const themeButton = document.getElementById('theme-toggle');
const authorizationSpan = document.getElementById('authorization-level');

// 1a interacao: Botao para simular Protocolo de Contencao (Altera tema e conteudo dinamicamente)
//"addeventListerner" = funcao que funciona como sensor para detectar eventos
themeButton.addEventListener('click', function() {
    // Adiciona/remove a classe que muda as variaveis CSS no corpo da pagina
    document.body.classList.toggle('containment-protocol');
    
    // Altera o conteudo (textContent) e estilos dinamicamente dependendo do estado
    if (document.body.classList.contains('containment-protocol')) {
        themeButton.textContent = 'Desativar Protocolo de Contenção';
        authorizationSpan.textContent = 'ALERTA MÁXIMO DE SEGURANÇA';
        authorizationSpan.style.color = '#ff5555';
        authorizationSpan.style.fontWeight = 'bold';
    } else {
        themeButton.textContent = 'Ativar Protocolo de Contenção';
        authorizationSpan.textContent = 'Classificado';
        authorizationSpan.style.color = '';
        authorizationSpan.style.fontWeight = 'normal';
    }
});

//  2a interacao: Botao de Descriptografar (Mostra alerta e exibe elemento oculto)
const decryptButton = document.querySelector('.decrypt-button');
const classifiedText = document.querySelector('.classified-text'); //"querySelector" = seleciona o 1a elemento do CSS fornecido (nesse caso, a classe "classified-text")

decryptButton.addEventListener('click', function() {
    // Requisito: Alerta visual
    alert('AVISO DO SISTEMA: Acessando logs de vulnerabilidade classificados da UNIT.');
    
    // Requisito: Remocao de classe para alterar estilo dinamico
    classifiedText.classList.remove('hidden');
    
    // Requisito: Remoção/Ocultacao de elemento (esconde o botao apos clicar)
    decryptButton.style.display = 'none';
});