// Write your JavaScript code here!
window.addEventListener("load", function() {
    const pilot = document.querySelector('input[name=pilotName]');
    const copilot = document.querySelector('input[name=copilotName]');
    const fuel = document.querySelector('input[name=fuelLevel]');
    const cargo = document.querySelector('input[name=cargoMass]');
    const list = document.getElementById('faultyItems');
    const form = document.querySelector('form');

    list.style.visibility = 'hidden';

    form.addEventListener('submit', (e) => {
        formSubmission(this.document, list, pilot, copilot, fuel, cargo);
        e.preventDefault();
    })

    let listedPlanets;
    let listedPlanetsResponse = myFetch(); // Sets listedPlanetsResponse equal to the value returned by calling myFetch()
    
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result ;
        // console.log(listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet from the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets);
        console.log(planet);
        addDestinationInfo(this.document, planet.name, planet.diameter, planet.star, planet.distance, planet.moon, planet.image);
    })
});