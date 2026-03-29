const destinations = [
  {
    name: "Paris",
    country: "France",
    type: "City",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    description: "The city of lights and love.",
    favorite: false,
  },
  {
    name: "Maldives",
    country: "Maldives",
    type: "Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Crystal clear water and luxury resorts.",
    favorite: false,
  },
  {
    name: "Tokyo",
    country: "Japan",
    type: "City",
    image: "https://images.unsplash.com/photo-1549693578-d683be217e58",
    description: "A mix of tradition and modern life.",
    favorite: false,
  },
  {
    name: "Swiss Alps",
    country: "Switzerland",
    type: "Mountain",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    description: "Snowy mountains and stunning views.",
    favorite: false,
  },
  {
    name: "Bali",
    country: "Indonesia",
    type: "Beach",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    description: "Nature, temples, and beaches.",
    favorite: false,
  },
];

const container = document.getElementById("container");

// Toggles the favorite status of a city and updates the display
function toggleFavorite(cityName) {
  const item = destinations.find((d) => d.name === cityName);
  if (!item) return;
  item.favorite = !item.favorite;

  displayDestinations(getDisplayedDestinations());
}

// returns the list of destinations based on the active filter
function getDisplayedDestinations() {
  const activeFilter = document.querySelector(".filter-active");
  console.log(activeFilter);

  if (!activeFilter || activeFilter.dataset.type === "All") return destinations;
  if (activeFilter.dataset.type === "Favorite") {
    return destinations.filter((item) => item.favorite);
  }
  return destinations.filter((item) => item.type === activeFilter.dataset.type);
}
// Highlights the active filter button
function showFilterActive(buttonElement) {
  document
    .querySelectorAll(".btn-outline-primary")
    .forEach((btn) => btn.classList.remove("filter-active"));
  if (buttonElement) {
    buttonElement.classList.add("filter-active");
  }
}
// Opens the modal to add a new city
function openAddCityModal() {
  const modalElement = document.getElementById("addCityModal");
  const modalInstance = new bootstrap.Modal(modalElement);
  modalInstance.show();
}

// Clears the form fields in the add city modal
function clearAddCityForm() {
  document.getElementById("newCityName").value = "";
  document.getElementById("newCityCountry").value = "";
  document.getElementById("newCityType").value = "City";
  document.getElementById("newCityImage").value = "";
  document.getElementById("newCityDescription").value = "";
}

// Adds a new city to the destinations list and updates the display
function addCity() {
  const name = document.getElementById("newCityName").value.trim();
  const country = document.getElementById("newCityCountry").value.trim();
  const type = document.getElementById("newCityType").value;
  const image = document.getElementById("newCityImage").value.trim();
  const description = document
    .getElementById("newCityDescription")
    .value.trim();

  if (!name || !country || !type || !image || !description) {
    alert("Please complete all fields before adding a city.");
    return;
  }

  destinations.push({
    name,
    country,
    type,
    image,
    description,
    favorite: false,
  });

  clearAddCityForm();
  const modalElement = document.getElementById("addCityModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) modalInstance.hide();

  displayDestinations(getDisplayedDestinations());
}

function displayDestinations(data) {
  container.innerHTML = "";

  data.forEach((item) => {
    const icon = item.favorite ? "❤️" : "♡";
    const badgeColor = () => {
      if (item.type === "City") {
        return "text-bg-primary";
      } else if (item.type === "Beach") {
        return "text-bg-success";
      } else {
        return "text-bg-danger";
      }
    };
    container.innerHTML += `
      <div class="col-12 col-md-6 col-lg-3 mb-4">
        <div class="card h-100 shadow">
          <img src="${item.image}" class="card-img-top" alt="${item.name}">
          <button
            class="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
            onclick="toggleFavorite('${item.name}')"
          >
            ${icon}
          </button>
          <div class="card-body ">
            <h5>${item.name}</h5>
            <p class="mb-1"><strong>${item.country}</strong></p>
            <p>${item.description}</p>
                    <span class="badge ${badgeColor()}">${item.type}</span>

          </div>
        </div>
      </div>
    `;
  });
}

function filterDestinations(type, button) {
  showFilterActive(button);

  if (type === "All") {
    displayDestinations(destinations);
  } else if (type === "Favorite") {
    displayDestinations(destinations.filter((item) => item.favorite));
  } else {
    const filtered = destinations.filter((item) => item.type === type);
    displayDestinations(filtered);
  }
}

// Load all by default
const defaultButton = document.querySelector("[data-type='All']");
if (defaultButton) showFilterActive(defaultButton);
displayDestinations(destinations);
