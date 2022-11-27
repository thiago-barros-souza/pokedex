const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const imgThemeDefinition = document.querySelector("img.img-template");
const titleTheme = document.querySelector("h1.title-template");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

function alterThemeDefinition() {
    const theme = document.querySelector("img[data-theme]");
    const content = document.querySelector(".content");

    if (theme.getAttribute("data-theme") === "dia") {
        imgThemeDefinition.src = "/assets/img/noite.png";
        theme.setAttribute("data-theme", "noite");
        content.setAttribute("style", "background-color: #111");
        titleTheme.setAttribute("style", "color: #FFF");
    }
    else {
        imgThemeDefinition.src = "/assets/img/dia.png";
        theme.setAttribute("data-theme", "dia");
        content.setAttribute("style", "background-color: #FFF");
        titleTheme.setAttribute("style", "color: #111");
    }
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit);
    }
});

imgThemeDefinition.addEventListener("click", alterThemeDefinition);