let currentPageUrl = '	https://pokeapi.co/api/v2/pokemon/'

window.onload = async () => {
    try {
        await loadPokemon(currentPageUrl);
    } catch {
        (error)
        console.log(error);
        alert('Error loading the cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadPokemon(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // gaat de vorige resultaten schoonmaken.

    try {
        const response = await fetch(url)
        const responseJson = await response.json();

        responseJson.results.forEach((character) => {
            const card = document.createElement("div")
            card.style.backgroundImage =
                `url('https://img.pokemondb.net/artwork/large/${character.name}.jpg')`
            card.className = "cards"

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "character-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "character-name"
            characterName.innerText = `${character.name}`

            characterNameBG.appendChild(characterName)
            card.appendChild(characterNameBG)

            card.onclick = async () => {


                const pokemonResponse = await fetch(url + character.name)
                const pokemonObject = await pokemonResponse.json();

                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''


                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage =
                    `url('https://img.pokemondb.net/artwork/large/${character.name}.jpg')`
                characterImage.className = "character-image"

                const name = document.createElement("span")
                name.className = "character-details"
                name.innerText = `Name: ${character.name}`

                const characterType = document.createElement("span")
                const types = pokemonObject.types?.map(obj => obj?.type?.name).join(', ')
                characterType.className = "character-details"
                characterType.innerText = `Types: ${types}`

                const characterId = document.createElement("span")
                characterId.className = "character-details"
                characterId.innerText = `National n°: ${pokemonObject.id}`

                const characterHeight = document.createElement("span")
                characterHeight.className = "character-details"
                characterHeight.innerText = `Height: ${pokemonObject.height / 10} m`

                const characterWeight = document.createElement("span")
                characterWeight.className = "character-details"
                characterWeight.innerText = `Weight: ${pokemonObject.weight / 10} kg`

                const characterAbility = document.createElement("span")
                const ability = pokemonObject.abilities?.map(obj => obj?.ability?.name).join(', ')
                characterAbility.className = "character-details"
                characterAbility.innerText = `Ability: ${ability}`

                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterType)
                modalContent.appendChild(characterId)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(characterWeight)
                modalContent.appendChild(characterAbility)




            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        alert('Error loading the pokemon')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPokemon(responseJson.next)

    } catch (error) {
        console.log('Error loading the next page')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPokemon(responseJson.previous)

    } catch (error) {
        console.log('Error loading the previous page')
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function showModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "visible"
}

// Als je een andere taal in de api hebt en wilt vertalen zoals bv kleuren van ogen:

// function convertEyecolor (eyecolor){
//     const kleuren = {
//         blue: "blauw",
//         brown: "bruin",
//         green: "groen",
//         yellow: "geel",
//         black: "zwart",
//         pink: "roos",
//         red: "rood",
//         orange: "oranje",
//         unknown: "onbekend"
//     };
//     return kleuren[eyecolor.toLowerCase()] || eyecolor;
// }

// Bij de weight en height van de pokemon hebben we de komma en de eenheiden er zelf boven ingezet.
// Je kan dit ook zoals hierboven een function maken om dit te veranderen. Zoals hieronder.

// function convertheight(height) {
//     if (height === "unknown"){
//     return "onbekend"
// }

// return (height / 100).toFixed(2);
// }

// function convertWeight(weight){
//     if (weight === "unknown") {
//         return "onbekend"
//     }
//     return `${weight} kg`
// }