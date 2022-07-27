// Write your JavaScript code here!
window.addEventListener("load", function() {
    const pilot = document.getElementById('pilotName');
    const copilot = document.querySelector('input[name=copilotName]');
    const fuel = document.querySelector('input[name=fuelLevel]');
    const cargo = document.querySelector('input[name=cargoMass]');
    const list = document.getElementById('faultyItems');
    const form = document.querySelector('form');

    list.style.visibility = 'hidden';

    form.addEventListener('submit', (e) => {

        if (validateInput(pilot.value) === "Empty" || validateInput(copilot.value) === "Empty" || validateInput(fuel.value) === "Empty" || validateInput(cargo.value) === "Empty") {
            alert('All fields required!');  // Alerts user of empty field.
            e.preventDefault();             // Prevents submission.
        }

        if (validateInput(pilot.value) === "Is a Number" || validateInput(copilot.value) === "Is a Number" || validateInput(fuel.value) === "Not a number" || validateInput(cargo.value) === "Not a Number") {
            alert('Make sure to enter valid information for each field!');
            e.preventDefault();
        }

        formSubmission(this.document, list, pilot, copilot, fuel, cargo);
    })
    
    let listedPlanets;
    let listedPlanetsResponse = myFetch(); // Sets listedPlanetsResponse equal to the value returned by calling myFetch()

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result ;
        // console.log(listedPlanets);
    }).then(function () {
        // Below this comment call the appropriate helper functions to pick a planet from the list of planets and add that information to your destination.
        console.log(listedPlanets);
        let planet = pickPlanet(listedPlanets);
        console.log(planet);
        
        addDestinationInfo(this.document, planet.name, planet.diameter, planet.star, planet.distance, planet.moon, planet.image);
    })
});