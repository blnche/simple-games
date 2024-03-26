// const pokemonAPIBaseUrl = "https://pokeapi.co/api/v2/pokemon/";
const animalcrossingAPIBaseUrl = "https://api.nookipedia.com/villagers"
const apiKey = "88bd6425-126c-436d-b101-b216efd3160e";

const headers = new Headers();
headers.append('X-API-KEY', apiKey);
headers.append('Accept-Version', '1.0.0');

const request = new Request(animalcrossingAPIBaseUrl, {
    method:'GET',
    headers: headers
});

let isPaused = false;
let firstPick;
let matches;
let score = 0;

const loadVillager = async () => {

    try {
        const response = await fetch(request);
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        const randomIds = new Set(); 
    
        while(randomIds.size < 8 ){
            const randomNumber = Math.ceil(Math.random() * 488);
            randomIds.add(randomNumber);
        }
    
        const selectedVillagers = [];
    
        for(const id of randomIds) {
            const index = id - 1;
            if(index >= 0 && index < data.length) {
                selectedVillagers.push(data[index])
            }
        }
    
        console.log(selectedVillagers);
        console.log(selectedVillagers[1].image_url);
    
        return selectedVillagers;

    } catch (error) {
        console.log('error in loadVillager');
    }
}

const displayVillager = (villager) => {
    console.log(villager);
    villager.sort( _ => Math.random() - 0.5);
    const villagerHTML = villager.map(villager => {
        return `
            <div class="card" onclick="clickCard(event)" data-villagername="${villager.name}"> 
                <div class="front"></div>
                <div class="back rotated">
                    <img src="${villager.image_url}" alt="${villager.name}"/>
                    <h2> ${villager.name}</h2>
                </div>
            </div>
        `
    }).join('');
    game.innerHTML = villagerHTML;
}

const clickCard = (event) => {
    const villagerCard = event.currentTarget;
    const [front, back] = getFrontAndBackCard(villagerCard);

    if(front.classList.contains('rotated') || isPaused) return;

    isPaused = true;
    
    rotateElements([front, back]);
    if(!firstPick) {
        firstPick = villagerCard;
        isPaused = false;
    } else {
        const secondVillagerName = villagerCard.dataset.villagername;
        const firstVillagerName = firstPick.dataset.villagername;

        if(firstVillagerName !== secondVillagerName) {
            const [firstFront, firstBack] = getFrontAndBackCard(firstPick);
            setTimeout(() => {
                rotateElements([front, back, firstFront, firstBack]);
                firstPick = null;
                isPaused = false;
            }, 500)
        } else {
            matches++;
            if(matches === 8) {
                score++;
                scoreboard.innerText = `Score : ${score}`;
            }
            firstPick = null;
            isPaused = false;
        }
    }

}

const rotateElements = (elements) => {
    if(typeof elements !== 'object' || !elements.length) return;

    elements.forEach(element => element.classList.toggle('rotated'));
}

const getFrontAndBackCard = (card) => {
    const front = card.querySelector(".front");
    const back = card.querySelector(".back");
    return [front, back];
}

const resetGame = () => {
    game.innerHTML = '';
    isPaused = true;
    firstPick = null;
    matches = 0;
    setTimeout(async () => {
        const villager = await loadVillager();
        displayVillager([...villager, ...villager]);
        isPaused = false;
    }, 200)
}

window.addEventListener('DOMContentLoaded', function() {
    const game = document.getElementById("game");
    const scoreboard = document.getElementById("scoreboard");
    // console.log(scoreboard);

    // console.log(score);

    scoreboard.innerText = `Score : ${score}`;

    resetGame();
})
