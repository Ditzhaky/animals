document.addEventListener("DOMContentLoaded", function () {
  let onlineVisitors = JSON.parse(localStorage.getItem("onlineVisitors")) || [];

  // Check if a visitor is logged in
  if (onlineVisitors.length > 0) {
    let visitor = onlineVisitors[0]; // Assuming only one visitor is logged in

    // Update the visitor's name and coins in the navigation menu
    let visitorInfo = document.getElementById("visitor-info");
    visitorInfo.innerHTML = `${visitor.visitorName} - Coins: ${visitor.coins}`;
  }
  const visitorSelect = document.getElementById("visitor-select");

  // Retrieve visitors data from local storage
  const visitors = JSON.parse(localStorage.getItem("visitors")) || [];

  // Add options for each visitor
  visitors.forEach((visitor) => {
    const option = document.createElement("option");
    option.value = visitor.name; // Set the visitor's name as the option value
    option.textContent = visitor.name; // Set the visitor's name as the option text
    visitorSelect.appendChild(option); // Append the option to the select element
  });
  const resetButton = document.getElementById("reset-button");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      // Clear all local storage data
      localStorage.clear();
      // Redirect to the home page or any other desired page
      window.location.href = "/login.html";
    });
  }
});

let feedButton = document.getElementById("feed-animal");
if (feedButton) {
  feedButton.addEventListener("click", feedAnimal);
} else {
  console.error("Feed button not found.");
}

// Call the render functions to display animals when the page loads
renderAnimal();
renderRelatedAnimals();

function feedAnimal() {
  let onlineVisitors = JSON.parse(localStorage.getItem("onlineVisitors")) || [];
  window.location.href = "/animal.html";

  // Check if there is a visitor logged in
  if (onlineVisitors.length === 0) {
    console.log("No visitor is logged in.");
    return; // Exit the function if no visitor is logged in
  }

  let visitor = onlineVisitors[0]; // Assuming only one visitor is logged in
  let selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));
  if (visitor.coins >= 2) {
    visitor.coins -= 2;
    visitor.feededAnimals.push(selectedAnimal);
    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    visitors = visitors.map((v) => {
      if (v.name === visitor.visitorName) {
        return {
          ...v,
          coins: visitor.coins,
          feededAnimals: visitor.feededAnimals,
        };
      }
      return v;
    });
    localStorage.setItem("visitors", JSON.stringify(visitors));
    localStorage.setItem("onlineVisitors", JSON.stringify(onlineVisitors));
    console.log("Animal has been fed successfully.");
    console.log("Visitor's coins remaining: " + visitor.coins);

    // Re-render animals after feeding
    renderAnimal();
    renderRelatedAnimals();
    const dialog = document.getElementById("feed-dialog");
    dialog.style.display = "block";
    const closeButton = document.getElementById("close-dialog");
    closeButton.addEventListener("click", () => {
      dialog.style.display = "none";
    });
  } else {
    if (selectedAnimal.isPredator) {
      visitorGotEaten();
    } else {
      animalEscaped();
    }
  }
}

//הציגו את החיה שאליה עברתם מעמוד גן החיות ששמורה בלוקל סטורג'
// רנדרו את פרטי החיה לתוך האלמנטים המתאימים בהתאם לשדה הספציפי

function renderAnimal() {
  // Retrieve the selected animal from local storage
  let selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));
  console.log(selectedAnimal);
  // Check if an animal is selected
  if (selectedAnimal) {
    // Display the selected animal's details on the animal page
    document.getElementById("name").textContent = selectedAnimal.name;
    document.getElementById(
      "weight"
    ).textContent = `Weight: ${selectedAnimal.weight} kg`;
    document.getElementById(
      "height"
    ).textContent = `Height: ${selectedAnimal.height} cm`;
    document.getElementById(
      "color"
    ).textContent = `Color: ${selectedAnimal.color}`;
    document.getElementById(
      "habitat"
    ).textContent = `Habitat: ${selectedAnimal.habitat}`;
    document.getElementById("isPredator").textContent = `Predator: ${
      selectedAnimal.isPredator ? "True" : "False"
    }`;
    renderRelatedAnimals();
  } else {
    // Handle the case when no animal is selected
    console.log("No animal selected.");
  }
}
function renderRelatedAnimals() {
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
  // רנדרו אותן לתוך הדיב שמיועד להן עם האיידי related-animals
  // ממשו את אותה לוגיקה של כרטיסיית חיה כמו בכרטיסיות בעמוד zoo.html
  // Retrieve the selected animal's habitat
  let selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));
  let selectedHabitat = selectedAnimal.habitat;

  // Filter out animals with the same habitat as the selected animal
  let relatedAnimals = animals.filter(
    (animal) => animal.habitat === selectedHabitat
  );
  relatedAnimals = relatedAnimals.filter(
    (animal) => animal.name !== selectedAnimal.name
  );

  // Clear previous content in the "related-animals" div
  let relatedAnimalsDiv = document.getElementById("related-animals");
  relatedAnimalsDiv.innerHTML = "";

  // Render details of related animals into the "related-animals" div
  relatedAnimals.forEach((animal) => {
    let animalCard = document.createElement("div");
    animalCard.classList.add("animal-card");

    // Construct the HTML content for the animal card
    animalCard.innerHTML = `
      <h2>${animal.name}</h2>
      <p>Weight: ${animal.weight} kg</p>
      <p>Height: ${animal.height} cm</p>
      <p>Color: ${animal.color}</p>
      <p>Habitat: ${animal.habitat}</p>
      <p>Predator: ${animal.isPredator ? "Yes" : "No"}</p>
    `;

    // Append the animal card to the "related-animals" div
    relatedAnimalsDiv.appendChild(animalCard);
  });
}
// ממשו את הלוגיקה של חיה שטורפת אורח
function visitorGotEaten() {
  let onlineVisitors = JSON.parse(localStorage.getItem("onlineVisitors")) || [];
  let visitor = onlineVisitors[0]; // Assuming only one visitor is logged in

  // Retrieve the selected animal from local storage
  let selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));

  // Check if the visitor has run out of coins and has attempted to feed a predator animal
  if (
    visitor &&
    visitor.coins < 2 &&
    selectedAnimal &&
    selectedAnimal.isPredator
  ) {
    // Remove the visitor from the onlineVisitors array
    onlineVisitors = onlineVisitors.filter(
      (v) => v.visitorName !== visitor.visitorName
    );
    localStorage.setItem("onlineVisitors", JSON.stringify(onlineVisitors));

    // Remove the visitor from the visitors array
    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    visitors = visitors.filter((v) => v.name !== visitor.visitorName);
    localStorage.setItem("visitors", JSON.stringify(visitors));

    alert(visitor.visitorName + " got eaten by a predator!");
    window.location.href = "/login.html";
  }
}
//ממשו את הלוגיקה של חיה שבורחת מגן החיות
function animalEscaped() {
  let selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));

  // Check if the selected animal is not a predator
  if (selectedAnimal && !selectedAnimal.isPredator) {
    // Remove the selected animal from the animals array
    let animals = JSON.parse(localStorage.getItem("animals")) || [];
    const index = animals.findIndex(
      (animal) => animal.name === selectedAnimal.name
    );
    if (index !== -1) {
      animals.splice(index, 1); // Remove the animal at the found index
      localStorage.setItem("animals", JSON.stringify(animals));
      alert(selectedAnimal.name + " has escaped from the zoo!");
      window.location.href = "/zoo.html";
    } else {
      alert("Selected animal not found in the zoo.");
    }
  }
}
