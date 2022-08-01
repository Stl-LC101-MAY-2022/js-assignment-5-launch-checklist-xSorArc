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

    if (testInput === "") {                         // If vI is inside formSubmisstion, trim() isn't recognized.
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
    
    let vIPilot = validateInput(pilot.value);
    let vICopilot = validateInput(copilot.value);
    let vIFuel = validateInput(fuelLevel.value);
    let vICargo = validateInput(cargoLevel.value);

    // form.addEventListener('submit', () => {
    
        console.log(`Values before if's: ${pilot.value} = ${vIPilot} || ${copilot.value} = ${vICopilot} || ${fuelLevel.value} = ${vIFuel} || ${cargoLevel.value} = ${vICargo}`);
    
        if (vIPilot === "Empty" || vICopilot === "Empty" || vIFuel === "Empty" || vICargo === "Empty") {
            alert('All fields required!');  // Alerts user of empty field.
            console.log('Empty alert ', pilot.value, vIPilot, 'Co:', copilot, 'Fuel:', fuelLevel, "Cargo:", cargoLevel);
            // e.preventDefault();             // Prevents submission.
        }
        
       else if (vIPilot === "Is a Number" || vICopilot === "Is a Number" || vIFuel === "Not a number" || vICargo === "Not a Number") {
            alert('Make sure to enter valid information for each field!');
            console.log(vIPilot, vICopilot, vIFuel, vICargo);
            console.log('Pilot:', pilot.value, 'Copilot:', copilot.value, 'Fuel:', fuelLevel.value,'Cargo:', cargoLevel.value);
            // e.preventDefault();
        }
    // })
        
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    if (cargoLevel < 10000 && fuelLevel < 10000) {                                      // Cargo ok & fuel too low
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)'; // Red
        list.style.visibility = "visible";
        
    } else if (cargoLevel > 10000 && fuelLevel >= 10000) {                              // Cargo too heavy & fuel ok
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)'; // Red
        list.style.visibility = "visible";
        
    } else if (cargoLevel > 10000 && fuelLevel < 10000) {                               // Cargo too heavy & fuel too low
        fuelStatus.innerHTML = 'Fuel level too low for launch';
        cargoStatus.innerHTML = 'Cargo mass too heavy for launch';                      
        launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
        launchStatus.style.color = 'rgb(199, 37, 78)'; // Red
        list.style.visibility = "visible";
        
    } else if (cargoLevel < 10000 && fuelLevel >= 10000) {                              // Everything ok           
        fuelStatus.innerHTML = 'Fuel level high enough for launch';
        cargoStatus.innerHTML = 'Cargo mass low enough for launch';
        launchStatus.innerHTML = 'Shuttle is Ready for Launch';
        launchStatus.style.color = 'rgb(65, 159, 106)'; // Green
        list.style.visibility = "visible";
    }
}

function myFetch() {
    let planetsReturned = fetch("https://handlers.education.launchcode.org/static/planets.json").then((response) => {
        return response.json();
    });
    return planetsReturned;
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
