const loader = document.querySelector(".popup-loader");
const selectedCountryNode = document.querySelector(".select__selected");
const countriesList = document.querySelector(".select__list");
const countryListVisibleClass = "select__list_visible";
const popupLoaderVisible = "popup-loader_visible";
const popupLoaderError = "popup-loader_error";

const countries = [];
let activeCountryIndex = null;

(async function () {
  loader.classList.add(popupLoaderVisible);

  try{
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    configurationCountriesObject(data);
    addCountriesToListAndSelectActiveCountry();

    loader.classList.remove(popupLoaderVisible);
  }catch (e){
    loader.classList.add(popupLoaderError);
  }
})()

function configurationCountriesObject(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].idd.root === undefined) {
      continue;
    }

    let firstNumberOfPhone = data[i].idd.root;
    if (data[i].idd.suffixes.length === 1) {
      firstNumberOfPhone += data[i].idd.suffixes[0];
    }

    countries.push({
      name: data[i].name.common, flag: data[i].flags.png, tel: firstNumberOfPhone
    });
  }
}

function changeActiveCountryIndex(newIndex) {
  activeCountryIndex = +newIndex;

  const activeCountry = countries[activeCountryIndex];
  selectedCountryNode.innerHTML = "";
  selectedCountryNode.insertAdjacentHTML("beforeend", `<img src="${activeCountry.flag}" class="select__img" alt="${activeCountry.name}">
  <div class="select__phone">${activeCountry.tel}</div>`);
}

function addCountriesToListAndSelectActiveCountry() {
  let elements = "";
  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];

    if (country.name === "Ukraine") {
      changeActiveCountryIndex(i);
    }

    elements += `<li data-arr-index="${i}">
<img class="select__img" src="${country.flag}" alt="${country.name}">
<div class="select__country-name">${country.name}</div>
<div class="select__phone">${country.tel}</div>
</li>`;
  }
  countriesList.insertAdjacentHTML("beforeend", elements);
}

selectedCountryNode.addEventListener("click", function () {
  countriesList.classList.toggle(countryListVisibleClass);
})

countriesList.addEventListener("click", function ({target}) {
  countriesList.classList.remove(countryListVisibleClass);

  if (target.tagName === "LI") {
    changeActiveCountryIndex(target.dataset.arrIndex);
  } else {
    changeActiveCountryIndex(target.parentNode.dataset.arrIndex);
  }
})