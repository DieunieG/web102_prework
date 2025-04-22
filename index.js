// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        // Create a new div
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        // Add game info using template literals
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
        `;

        // Add the card to the DOM
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function initially with all games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page
*/

// grab the stats card elements
const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

// calculate and display total contributions
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);
contributionsCard.innerText = totalContributions.toLocaleString("en-US");

// calculate and display total money raised
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);
raisedCard.innerText = `$${totalRaised.toLocaleString("en-US")}`;

// display total number of games
gamesCard.innerText = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Filter funded and unfunded games with button functionality
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company
*/

const descriptionContainer = document.getElementById("description-container");

const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

const displayStr = `A total of $${totalRaised.toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!`;

const descriptionElement = document.createElement("p");
descriptionElement.innerText = displayStr;
descriptionContainer.appendChild(descriptionElement);

/*************************************************************************************
 * Challenge 7: Select & display the top 2 games
*/

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);
const [topGame, secondGame] = sortedGames;

const topGameElement = document.createElement("p");
topGameElement.innerText = topGame.name;
firstGameContainer.appendChild(topGameElement);

const secondGameElement = document.createElement("p");
secondGameElement.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
