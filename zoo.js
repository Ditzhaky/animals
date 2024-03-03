document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("visitor-select");
  let onlineVisitors = JSON.parse(localStorage.getItem("onlineVisitors")) || [];
  let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  let visitorInfo = document.getElementById("visitor-info");
  let filteredAnimals = animals; // resets the filteredAnimals

  renderFilteredAnimals(filteredAnimals);
  visitorInfo.innerHTML = `${onlineVisitors[0].name} - Coins: ${onlineVisitors[0].coins}`; // Update the nav menu
  populateVisitorOptions(selectElement, visitors); //function from main
  handleVisitorSelection(
    selectElement,
    visitors,
    updateVisitorInfo,
    clearSearchAndFilters,
    renderAvailableAnimals
  );
  //את הפונקציה הזאת בחרתי שלא להכניס למיין כי שיניתי את התפקוד שלה בהתאם לרצונות שלי בכל עמוד

  function updateVisitorInfo(selectedVisitor) {
    onlineVisitors[0] = selectedVisitor; // Set as the current online visitor
    localStorage.setItem("onlineVisitors", JSON.stringify(onlineVisitors)); // Update local storage
    let visitorInfo = document.getElementById("visitor-info");
    visitorInfo.innerHTML = `${onlineVisitors[0].name} - Coins: ${onlineVisitors[0].coins}`; // Correct property access
  }
  function clearSearchAndFilters() {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = ""; // Clear search input
    localStorage.removeItem("filters"); // Remove filters from local storage
  }
  // Attach the event listener to the select element
  renderAvailableAnimals();

  selectOnlineVisitor(selectElement, onlineVisitors); //function from main

  const submitButton = document.getElementById("submit-filters");
  submitButton.addEventListener("click", function () {
    setFilter();
  });

  function renderAvailableAnimals() {
    const animals = JSON.parse(localStorage.getItem("animals")) || [];
    const filters = JSON.parse(localStorage.getItem("filters")) || {};
    const animalListContainer = document.getElementById("animal-cards");
    animalListContainer.innerHTML = "";

    // Iterate over each animal and create a card for it
    animals.forEach((animal) => {
      // Assume the animal meets the filter criteria by default
      let meetsFilterCriteria = true;

      // Check if the animal meets the filter criteria
      if (
        filters.isPredator !== undefined &&
        animal.isPredator !== filters.isPredator
      ) {
        meetsFilterCriteria = false;
      }
      if (filters.habitat !== undefined && animal.habitat !== filters.habitat) {
        meetsFilterCriteria = false;
      }
      if (filters.weight !== undefined && animal.weight <= filters.weight) {
        meetsFilterCriteria = false;
      }
      if (filters.height !== undefined && animal.height <= filters.height) {
        meetsFilterCriteria = false;
      }
      if (filters.color !== undefined && animal.color !== filters.color) {
        meetsFilterCriteria = false;
      }

      // If the animal meets the filter criteria, create its card and append it to the container
      if (meetsFilterCriteria) {
        const card = document.createElement("div");
        card.classList.add("animal");
        card.addEventListener("click", function () {
          visitAnimal(animal.name);
        });

        const nameElement = document.createElement("h2");
        nameElement.textContent = animal.name;

        const predatorElement = document.createElement("p");
        predatorElement.textContent = `Predator: ${
          animal.isPredator ? "Yes" : "No"
        }`;

        const weightElement = document.createElement("p");
        weightElement.textContent = `Weight: ${animal.weight} kg`;

        const heightElement = document.createElement("p");
        heightElement.textContent = `Height: ${animal.height} cm`;

        const colorElement = document.createElement("p");
        colorElement.textContent = `Color: ${animal.color}`;

        const habitatElement = document.createElement("p");
        habitatElement.textContent = `Habitat: ${animal.habitat}`;

        const imageElement = document.createElement("img");
        imageElement.src = animal.Image; // Assuming 'Image' is the correct property name

        // Append elements to the card
        card.appendChild(nameElement);
        card.appendChild(predatorElement);
        card.appendChild(weightElement);
        card.appendChild(heightElement);
        card.appendChild(colorElement);
        card.appendChild(habitatElement);
        card.appendChild(imageElement);

        // Append the card to the container
        animalListContainer.appendChild(card);
      }
    });
  }

  // ממשו את הלוגיקה שמרנדרת את החיות לתוך הדיב עם האיידי animal-cards
  // וודאו שאתם מציגים אך ורק את החיות שעומדות בפילטורים הנוכחיים
  // במידה ואין פילטרים מסומנים, הציגו את כל החיות

  function visitAnimal(animalName) {
    // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
    // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
    let onlineVisitors =
      JSON.parse(localStorage.getItem("onlineVisitors")) || [];

    // Check if there is a visitor logged in
    if (onlineVisitors.length === 0) {
      return; // Exit the function if no visitor is logged in
    }

    let visitor = onlineVisitors[0]; // Assuming only one visitor is logged in
    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    let visitorIndex = visitors.findIndex((v) => v.name === visitor.name);
    if (visitorIndex !== -1) {
      // Initialize visitedAnimals property as an empty array if it doesn't exist
      if (!visitors[visitorIndex].visitedAnimals) {
        visitors[visitorIndex].visitedAnimals = [];
      }
      let animals = JSON.parse(localStorage.getItem("animals")) || [];

      let selectedAnimal = animals.find((animal) => animal.name === animalName);
      visitors[visitorIndex].visitedAnimals.push(selectedAnimal);
      onlineVisitors[0].visitedAnimals.push(selectedAnimal);
      localStorage.setItem("selectedAnimal", JSON.stringify(selectedAnimal));
      localStorage.setItem("onlineVisitors", JSON.stringify(onlineVisitors));
      localStorage.setItem("visitors", JSON.stringify(visitors));
      // Update the visitor's data in localStorage
      selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal")) || [];
      window.location.href = "animal.html";
    }
  }

  function setFilter(filterKey, filterValue) {
    /**
     * ממשו את הלוגיקה של השמת פילטר
     * הפילטרים הקיימים הם
     * isPredator: true | false
     * habitat: "land" | "sea"
     * weight: value > user selected weight
     * height: value > user selected height
     * color: dropdown of all available colors
     */
    // ודאו כי אתם שומרים את הפילטרים שהיוזר בחר בלוקל סטורג׳ וטוענים אותם בהתאם
    // רנדרו רק את החיות שעומדות בתנאים של הפילטרים
    // Retrieve filter values from input elements
    const isPredatorCheckbox = document.getElementById("is-predator");
    const habitatSelect = document.getElementById("habitat");
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const colorSelect = document.getElementById("color");

    const filters = {
      isPredator: isPredatorCheckbox.checked,
      habitat: habitatSelect.value,
      weight: parseFloat(weightInput.value),
      height: parseFloat(heightInput.value),
      color: colorSelect.value,
    };

    // Update the filter value if provided
    if ((filterKey && filterValue) !== "undefined") {
      filters[filterKey] = filterValue;
    }

    // Store the filters in local storage
    localStorage.setItem("filters", JSON.stringify(filters));

    // Render animals based on the updated filters
    renderAvailableAnimals();

    // Log the filters to see the result
  }
  const resetFiltersButton = document.getElementById("reset-filters");
  resetFiltersButton.addEventListener("click", function () {
    // Clear filters from local storage

    localStorage.removeItem("filters");

    // Clear input fields and reset checkboxes
    const isPredatorCheckbox = document.getElementById("is-predator");
    isPredatorCheckbox.checked = false;

    const habitatSelect = document.getElementById("habitat");
    habitatSelect.selectedIndex = 0;

    const weightInput = document.getElementById("weight");
    weightInput.value = "";

    const heightInput = document.getElementById("height");
    heightInput.value = "";

    const colorSelect = document.getElementById("color");
    colorSelect.selectedIndex = 0;

    // Render all animals again
    renderAvailableAnimals();
  });
  let searchInput = document.getElementById("searchInput");
  searchInput.value = "";
  searchInput.addEventListener("input", function () {
    // Get the search query from the input field
    let query = this.value.trim().toLowerCase();
    // Filter animals based on the search query
    filteredAnimals = animals.filter((animal) =>
      animal.name.toLowerCase().includes(query)
    );
    renderFilteredAnimals(filteredAnimals);

    let animalCards = document.querySelectorAll(".animal-card");
    animalCards.forEach((card) => {
      card.addEventListener("click", visitAnimal);
    });
  });

  function renderFilteredAnimals(filteredAnimals) {
    const animalListContainer = document.getElementById("animal-cards");
    animalListContainer.innerHTML = ""; // Clear existing content
    localStorage.setItem("filteredAnimals", JSON.stringify(filteredAnimals));
    // Iterate over each filtered animal and create a card for it
    filteredAnimals.forEach((animal) => {
      const card = document.createElement("div");
      card.classList.add("animal");
      card.addEventListener("click", function () {
        visitAnimal(animal.name);
      });

      // Create elements for animal data
      const nameElement = document.createElement("h2");
      nameElement.textContent = animal.name;
      const predatorElement = document.createElement("p");
      predatorElement.textContent = `Predator: ${
        animal.isPredator ? "Yes" : "No"
      }`;

      const weightElement = document.createElement("p");
      weightElement.textContent = `Weight: ${animal.weight} kg`;

      const heightElement = document.createElement("p");
      heightElement.textContent = `Height: ${animal.height} cm`;

      const colorElement = document.createElement("p");
      colorElement.textContent = `Color: ${animal.color}`;

      const habitatElement = document.createElement("p");
      habitatElement.textContent = `Habitat: ${animal.habitat}`;
      const imageElement = document.createElement("img");
      imageElement.src = animal.Image;
      card.appendChild(nameElement);
      card.appendChild(predatorElement);
      card.appendChild(weightElement);
      card.appendChild(heightElement);
      card.appendChild(colorElement);
      card.appendChild(habitatElement);
      card.appendChild(imageElement);

      // Append the card to the container
      animalListContainer.appendChild(card);
    });
  }
  filteredAnimals = JSON.parse(localStorage.getItem("filteredAnimals"));

  // If there are filtered animals, render them
  if (filteredAnimals) {
    renderFilteredAnimals(filteredAnimals);
  } else {
    // If there are no filtered animals, render all animals
    renderAvailableAnimals();
  }
  // Get the select element

  setupResetButton("reset-button", "/login.html");
});
