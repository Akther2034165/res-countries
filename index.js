const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const countryContainer = document.getElementById("country-container");
const countryDetails = document.getElementById("country-details");
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");

searchBtn.addEventListener("click", function () {
  const searchText = searchInput.value;
  if (searchText === "") {
    errorDiv.innerText = "Search input can not be empty";
  }

  /* Clear dom*/
  countryContainer.innerHTML = " ";
  countryDetails.innerHTML = " ";

  const url = `https://restcountries.eu/rest/v2/name/${searchText}`;
  setTimeout(() => spinner.classList.remove("d-none"), 2000);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data))
    .finally((data = searchInput.value === " "));
});

function showData(countryArray) {
  {
    /* Error handling */
    if (countryArray.status === 404) {
      errorDiv.innerText = "No result found!";
    } else {
      errorDiv.innerText = " ";
    }
    countryArray.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("col-md-3");
      div.innerHTML = `
          <!-- Images -->
          <div class="rounded overflow-hidden border p-2">
              <img height = "200"  src="${item.flag}" alt="" class="w-100" />
          </div>
          <!-- Body -->
          <div class="
                  py-2
                  d-flex
                  justify-content-between
                  align-items-center
                  d-md-block
                  text-md-centet">
              <h1>${item.name}</h1>
              <button onclick ="showDetails('${item.alpha3Code}') " class="btn btn-dark">Learn More</button>
          </div>
          </div>
          `;
      countryContainer.appendChild(div);
    });
  }
}
function showDetails(alpha3Code) {
  fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
    .then((res) => res.json())
    .then((data) => {
      //data -> object
      //data.currencies -> array
      //data.currencies[] -> Object
      //data.currencies[0].name = Currency er Nam dekhabe
      countryDetails.innerHTML = `
        <div class="col-md-12">
           <h1>${data.name}</h1>
           <p>Capital : ${data.capital}<br>
           Population :${data.population}<br>
           Language : ${data.languages[0].nativeName}</p>
           <p>Currency Name : ${data.currencies[0].name}</p>
           <p>Currency Type : ${data.currencies[0].symbol}</p>
        </div>
      `;
    });
}
