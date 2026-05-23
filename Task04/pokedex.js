const gridPokedex = document.getElementById('pokedex-grid');
const inputBusca = document.getElementById('input-busca');
const btnBusca = document.getElementById('btn-busca');
const selectTipo = document.getElementById('select-tipo');

// Variavel global para armazenar os pokemons carregados para usar no filtro
let pokemonsCarregados = [];

// Listagem inicial (minimo 50 Pokemons)
async function carregarPokemonsIniciais() { //async para usar await dentro da funcao
    try {
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
        const dados = await resposta.json();
        
        // A API inicial so traz nome e URL. Precisamos fazer um fetch em cada URL para pegar imagem e tipo.
        const promessas = dados.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
        });

        // Espera todos os 50 fetches terminarem
        pokemonsCarregados = await Promise.all(promessas);
        
        exibirPokemons(pokemonsCarregados);
    } catch (erro) {
        console.error("Erro ao carregar Pokémons:", erro);
        gridPokedex.innerHTML = `<p>Erro ao carregar a Pokédex.</p>`;
    }
}

// Exibicao em Cards
function exibirPokemons(listaPokemons) {
    gridPokedex.innerHTML = ''; // Limpa o grid

    if (listaPokemons.length === 0) {
        gridPokedex.innerHTML = `<p>Nenhum Pokémon encontrado.</p>`;
        return;
    }

    listaPokemons.forEach(pokemon => {
        // Pega os tipos e cria tags <span> para cada um
        const tiposHtml = pokemon.types.map(tipoInfo => 
            `<span>${tipoInfo.type.name}</span>`
        ).join('');

        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p>Nº ${pokemon.id}</p>
            <h3>${pokemon.name}</h3>
            <div class="tipos">
                ${tiposHtml}
            </div>
        `;
        
        gridPokedex.appendChild(card);
    });
}

// Busca de Pokémon na API (Por Nome ou ID)
async function buscarPokemon() {
    const termoBusca = inputBusca.value.trim().toLowerCase();
    
    if (termoBusca === '') {
        // Se a busca estiver vazia, volta a mostrar os 50 iniciais
        exibirPokemons(pokemonsCarregados);
        return;
    }

    try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${termoBusca}`);
        
        if (!resposta.ok) {
            throw new Error('Pokémon não encontrado');
        }

        const pokemon = await resposta.json();
        exibirPokemons([pokemon]); // Passa dentro de um array pois a funcao espera uma lista
    } catch (erro) {
        gridPokedex.innerHTML = `<p>Pokémon "${termoBusca}" não encontrado!</p>`;
    }
}

// Filtro por Tipo na lista carregada
function filtrarPorTipo() {
    const tipoSelecionado = selectTipo.value;

    if (tipoSelecionado === 'todos') {
        exibirPokemons(pokemonsCarregados);
        return;
    }

    const pokemonsFiltrados = pokemonsCarregados.filter(pokemon => {
        // Verifica se algum dos tipos do pokemon bate com o selecionado
        return pokemon.types.some(tipoInfo => tipoInfo.type.name === tipoSelecionado);
    });

    exibirPokemons(pokemonsFiltrados);
}

// Eventos
btnBusca.addEventListener('click', buscarPokemon);

// Permite buscar apertando "Enter" no teclado
inputBusca.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarPokemon();
});

selectTipo.addEventListener('change', filtrarPorTipo);

// Chama a função inicial assim que o script carrega
carregarPokemonsIniciais();