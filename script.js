const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = []; // global scoped array with users last and first name and wealth

//start with 3 people
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money// use async await to make a ajax call with the fetch API await the json
async function getRandomUser() {
    const res = await fetch("https://randomuser.me/api"); // convert the JSON file to an array of objects
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`, //traverse the object to find random name
        money: Math.floor(Math.random() * 1000000) // create random wealth
    };
    addData(newUser); //pass over the new array created.
}

//Add new obj to new data arr
function addData(obj) {
    data.push(obj); //received created array from API call and pushed to global array.

    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`; //clear the main Div

    providedData.forEach(person => { // arr of peoples first and last name with wealth from global arr
        //create a new div element with a class of person and insert it into the main section of the page
        const divElement = document.createElement("div");
        divElement.classList.add("person");
        divElement.innerHTML = `<strong>${person.name}</strong> $${formatMoney(person.money)}`;
        main.appendChild(divElement);
    });
}
//format number as money
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
//--------buttons

function doubleMoney() { // uses map to double the money using a spread operator 
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    })
    updateDOM();
}
function sortByRichest() { //sorts the people by thier money
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}
function filterMillionaires() {
    data = data.filter(user => user.money >= 1000000);
    updateDOM();
}
function totalWealth() {
    let total = data.reduce((sum, num) => sum += num.money, 0)
    const wealthElement = document.createElement("div");
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(wealthElement);
    
}

//Events
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", filterMillionaires);
calculateWealthBtn.addEventListener("click", totalWealth);

