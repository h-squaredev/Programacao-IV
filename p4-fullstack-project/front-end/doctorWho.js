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

// ----------------------------------------
// INTERAÇÃO COM O BACK-END

const API_URL = 'http://localhost:3000';

// 1. Busca os posts do MySQL via Back-end
async function carregarPosts() {
  try {
    const resposta = await fetch(`${API_URL}/posts`);
    const posts = await resposta.json();
    renderizarPostsNaTela(posts);
  } catch (erro) {
    console.error('Erro ao buscar posts do servidor:', erro);
  }
}

// 2. Renderiza os cards sem CSS inline
function renderizarPostsNaTela(posts) {
  const container = document.getElementById('container-doctor-who');
  container.innerHTML = ''; 

  posts.forEach(post => {
    container.innerHTML += `
      <div class="card post-card">
        <h3>${post.titulo}</h3>
        <img src="${post.imagem}" alt="${post.titulo}" width="250" />
        <p>${post.conteudo}</p>
      </div>
    `;
  });
}

// 3. Login com alternância de classe
async function fazerLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const resposta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      localStorage.setItem('tokenJWT', dados.access_token);
      alert('Acesso autorizado!');
      
      // Usa as classes CSS para exibir/ocultar
      document.getElementById('login-section').classList.add('hidden');
      document.getElementById('create-post-section').classList.remove('hidden');
    } else {
      alert('Credenciais inválidas!');
    }
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

// 4. Criação de novo post
async function criarNovoPost() {
  const titulo = document.getElementById('titulo').value;
  const conteudo = document.getElementById('conteudo').value;
  const imagem = document.getElementById('imagem').value;
  const ordenacao = parseInt(document.getElementById('ordenacao').value);

  const token = localStorage.getItem('tokenJWT');
  if (!token) {
    alert('Você precisa fazer login primeiro!');
    return;
  }

  const novoPost = { titulo, conteudo, imagem, ordenacao };

  try {
    const resposta = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(novoPost)
    });

    if (resposta.status === 201) {
      alert('Postagem criada com sucesso!');
      carregarPosts();
    } else {
      alert('Erro de autorização. O seu token pode ter expirado.');
    }
  } catch (erro) {
    console.error('Erro ao cadastrar post:', erro);
  }
}

// 5. Logout restaurando as views
function fazerLogout() {
  localStorage.removeItem('tokenJWT');
  document.getElementById('login-section').classList.remove('hidden');
  document.getElementById('create-post-section').classList.add('hidden');
}

// 6. Configuração inicial ao carregar a página
window.onload = () => {
  carregarPosts(); 

  if (localStorage.getItem('tokenJWT')) {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('create-post-section').classList.remove('hidden');
  }
};