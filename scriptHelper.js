// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const mTarget = document.getElementById('missionTarget');
    
    mTarget.innerHTML = `
    <h2>Mission Destination</h2>
    <ol>
    <li>Name: ${name}</li>
    <li>Diameter: ${diameter}</li>
    <li>Star: ${star}</li>
    <li>Distance from Earth: ${distance}</li>
    <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {

    if (testInput.trim() === "") {
        return "Empty";
    } else if (Number(testInput)) {
        return "Is a Number";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } 
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    list = document.getElementById('faultyItems');
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById('copilotStatus');
    const fuelStatus = document.getElementById('fuelStatus');
    const cargoStatus = document.getElementById('cargoStatus');
    const launchStatus = document.getElementById('launchStatus');
    // const form = document.querySelector('form');
        
    if (cargoLevel < 10000 && fuelLevel < 10000) {                                      // Cargo ok & fuel too low
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        list.style.visibility = "visible";
        launchStatus.style.color = 'rgb(199, 37, 78)'; // Red
        
    } else if (cargoLevel > 10000 && fuelLevel >= 10000) {                              // Cargo too heavy & fuel ok
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        list.style.visibility = "visible";
        launchStatus.style.color = 'rgb(199, 37, 78)'; // Red
            
    } else if (cargoLevel > 10000 && fuelLevel < 10000) {                               // Cargo too heavy & fuel too low
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        fuelStatus.innerHTML = 'Fuel level too low for launch';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';                      
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        list.style.visibility = "visible";
        launchStatus.style.color = 'rgb(199, 37, 78)'; // Red
            
    } else if (cargoLevel < 10000 && fuelLevel >= 10000) {                              // Everything ok
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;            
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        launchStatus.innerHTML = 'Shuttle is Ready for Launch';
        list.style.visibility = "visible";
        launchStatus.style.color = 'rgb(65, 159, 106)'; // Green
    }
}

async function myFetch() {
    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    return await planetsReturned.json();
}

function pickPlanet(planets) {
    index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
