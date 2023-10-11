const trajButton = document.querySelector('#trajectoryButton');
const seventhTraj = document.querySelector('#seventhTrajectory');
const seventhPlan = document.querySelector('#seventhPlanet');
const planets = document.querySelectorAll('.planet');
const planetPicture = document.querySelector('.planetCardPicture');
const planetCardPictureContainer = document.querySelector(
  '.planetCardPictureContainer'
);
const solarSystem = document.querySelector('.solarSystem');
const generationButton = document.querySelector('#generateSolarSystem');
const planetCard = document.querySelector('.planetCard');
const sun = document.querySelector('#sun');
const planetName = document.querySelector('#planetNameContainer h2');
const territoryName = document.querySelector('#territoryName p');
const resourceName = document.querySelector('#resources p');
const lifeFormName = document.querySelector('#lifeForms p');

fetch('./listnames/countryList.json')
  .then(response => response.json())
  .then(data => {
    window.countryList = data.countryList;
  })
fetch('./listnames/elements.json')
  .then(response => response.json())
  .then(data => {
    window.elements = data.elements;
  })
fetch('./listnames/galaxyNames.json')
  .then(response => response.json())
  .then(data => {
    window.galaxyNames = data.galaxyNames;
  })
fetch('./listnames/lifeKingdoms.json')
  .then(response => response.json())
  .then(data => {
    window.lifeKingdoms = data.lifeKingdoms;
  })
fetch('./listnames/planetNames.json')
  .then(response => response.json())
  .then(data => {
    window.planetNames = data.planetNames;
  })


let galaxyName;

let systemLifeForms = [];


let systemCountries = [];

let systemResources = [];

//These 3 are created to get the array to become a string where there is a newline after each item (important for the galaxy info display see more info below)
let systemCountriesList = [];
let systemResourcesList = [];
let systemLifeFormsList = [];

//On click start animation! Starts with a 360 rotation but for each click and scroll it increases by one, by doing this it will keep going, i had a problem before that when u did not increase rot and let it only stay at 360 it only worked once
let rot = 360;
trajButton.addEventListener('click', () => {
  if (solarSystem.classList.contains('active')) {
    rot = rot + 1;
    seventhTraj.style = 'transform: rotate(' + rot + 'deg)';
  }
});

//On scroll start animation;
window.addEventListener('scroll', () => {
  if (solarSystem.classList.contains('active')) {
    rot = rot + 1;
    seventhTraj.style = 'transform: rotate(' + rot + 'deg)';
  }
});

generationButton.addEventListener('click', () => {
  //Randomizes a galaxy name and removes the name from the array
  const randomGalaxyIndex = Math.floor(Math.random() * galaxyNames.length);
  galaxyName = galaxyNames[randomGalaxyIndex];
  planetName.innerText = galaxyName;
  galaxyNames.splice(galaxyNames.indexOf(galaxyName), 1);

  //The following arrays restores the previous generated values on eachclick.
  systemCountries = [];
  systemResources = [];
  systemLifeForms = [];
  systemCountriesList = [];
  systemResourcesList = [];
  systemLifeFormsList = [];

  for (let i = 0; i < planets.length - 1; i++) {
    //for each planet minus the sun, pick out a random country, resource and lifeform and push them into a new array
    const randomCountryIndex = Math.floor(Math.random() * countryList.length);
    const countryName = countryList[randomCountryIndex];
    systemCountries.push(countryName);
    const randomResourceIndex = Math.floor(Math.random() * elements.length);
    const resources = elements[randomResourceIndex];
    systemResources.push(resources);
    const randomLifeformsIndex = Math.floor(
      Math.random() * lifeKingdoms.length
    );
    const life = lifeKingdoms[randomLifeformsIndex];
    systemLifeForms.push(life);
  }

  //Before i had some problem with the info displayed during galaxy, this join does so after each item it creates a new line
  systemCountriesList = systemCountries.join(',\n');
  systemResourcesList = systemResources.join(',\n');
  systemLifeFormsList = systemLifeForms.join(',\n');

  //this converts the arrays into strings and displays them into the galaxy info.
  territoryName.innerText = systemCountriesList.toString();
  resourceName.innerText = systemResourcesList.toString();
  lifeFormName.innerText = systemLifeFormsList.toString();

  // When u click the generate system button, if solarsystem and planetCard are not active then activate them
  if (!solarSystem.classList.contains('active')) {
    solarSystem.classList.toggle('active');
    planetCard.classList.toggle('active');
  } else {
    //If solar system and planetcard are active then remove previous planetPictureActivation (this was a buggfix, if u pressed a planet and then generated a new galaxy it would display the previous planet above the mini solar system)
    planetPicture.classList.remove('active');
    planetPicture.style.backgroundColor = 'black';
  }

  planetCardPictureContainer.addEventListener('click', () => {
    //If planetPicture is active when u click on PlanetCardContainer it should remove previous Planet picture and display solarsystem again, in retrospect i could have made this part easier.
    if (planetPicture.classList.contains('active')) {
      planetPicture.classList.remove('active');
      planetCardPictureContainer.style.cursor = 'default';
      planetPicture.innerHTML = solarSystem.innerHTML;
      planetPicture.style.backgroundColor = 'black';
      planetName.innerText = galaxyName;
      territoryName.innerText = systemCountriesList.toString();
      resourceName.innerText = systemResourcesList.toString();
      lifeFormName.innerText = systemLifeFormsList.toString();
    }
  });

  planets.forEach((planet, index) => {
    //gives every planet a cursor
    planet.style.cursor = 'pointer';
    //Randomizes and give each planet a name and removes it from the planetNames array (so there can not be any duplicates when u generate a new system)
    const randomPlanetNameIndex = Math.floor(
      Math.random() * planetNames.length
    );
    const name = planetNames[randomPlanetNameIndex];
    planetNames.splice(planetNames.indexOf(name), 1);

    //randomizes a territory name for each planet from the array systemCountries which is generated when u press the generate system button. There is only 7 countires in the array which leaves no space for the sun to get a terriotry since that would be weird but also kinda sci-fi)
    const planetNation = systemCountries[index];

    //these empty arrays gets filled for each planet a resource and lifeform, but they also help clean out the previous stored values if u press the generate system
    let planetResource = [];
    let planetLifeForm = [];

    //For every planet that is not the sun generate a rgb color, and give them a resource and lifeform
    if (!planet.classList.contains('sun')) {
      let r1 = Math.floor(Math.random() * 255);
      let g1 = Math.floor(Math.random() * 255);
      let b1 = Math.floor(Math.random() * 255);
      let r2 = Math.floor(Math.random() * 255);
      let g2 = Math.floor(Math.random() * 255);
      let b2 = Math.floor(Math.random() * 255);
    
      planetResource = systemResources[index];
      planetLifeForm = systemLifeForms[index];
    
      // Create a gradient background color using CSS linear gradient
      planet.style.background = `linear-gradient(to bottom, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}))`;
    } else {
      // The sun shall always remain orange
      planet.style.backgroundColor = 'orange';
    }

    planet.addEventListener('mouseover', () => {
      planet.style.border = '1px solid white';
    });

    planet.addEventListener('mouseleave', () => {
      planet.style.border = '0px';
    });

    //The planetpicture (infoPicture) is always first displayed as the generated solarsystem
    planetPicture.innerHTML = solarSystem.innerHTML;

    planet.addEventListener('click', () => {
      //If u press on a planet it will activate planetPicture active which will replace the solarystem with the clicked planet and when u click on it again it will display the solarsystem info
      if (!planetPicture.classList.contains('active')) {
        planetPicture.classList.toggle('active');
        planetCardPictureContainer.style.cursor = 'pointer';
      }
      //foreach planet u click on this code gives it its information in the infocard
      planetPicture.innerHTML = planet.innerHTML;
      planetPicture.style.backgroundColor = planet.style.backgroundColor;
      planetName.innerText = name;
      territoryName.innerText = planetNation;
      resourceName.innerText = planetResource;
      lifeFormName.innerText = planetLifeForm;
      //If u press the sun it will show the following information
      if (planet.classList.contains('sun')) {
        resourceName.innerText = 'Light, Heat, Energy';
        territoryName.innerText =
          'Since 1967 The Outer Space Treaty has prevented that no soverign nation can own celestial bodies like Moons or Suns.';
        lifeFormName.innerText =
          "Right now, there's no evidence to support nuclear life on any suns due to their extreme temperatures and radiation.";
      }
    });
  });
});
