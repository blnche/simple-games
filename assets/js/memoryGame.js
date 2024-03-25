const pokemonAPIBaseUrl = "https://pokeapi.co/api/v2/pokemon/";

window.addEventListener('DOMContentLoaded', function() {
    const game = document.getElementById("game");
    console.log(game);
})


const loadPokemon = async () => {

    const randomIds = new Set(); //same as array but takes care of duplicates

    while(randomIds.size < 8 ){
        const randomNumber = Math.ceil(Math.random() * 150);
        randomIds.add(randomNumber);
    }

    const pokemonPromises = [...randomIds].map( id => fetch(pokemonAPIBaseUrl + id)); //three dots = spread operator, allow to convert set to array
    const responses = await Promise.all(pokemonPromises);

    return await Promise.all(responses.map(res => res.json()));
}

const displayPokemon = (pokemon) => {
    console.log("Displaying Pokemons");
    pokemon.sort( _ => Math.random() - 0.5);
    const pokemonHTML = pokemon.map(pokemon => {
        return `
            <div class="card"> 
                <h2> ${pokemon.name}</h2>
            </div>
        `
    }).join('');
    game.innerHTML = pokemonHTML;
}

const resetGame = async () => {
    const pokemon = await loadPokemon();
    displayPokemon([...pokemon, ...pokemon]);
}

resetGame();