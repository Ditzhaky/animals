document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("visitor-select");
  let onlineVisitors = JSON.parse(localStorage.getItem("onlineVisitors")) || [];
  let visitorInfo = document.getElementById("visitor-info");

  console.log(onlineVisitors[0].name);
  visitorInfo.innerHTML = `${onlineVisitors[0].name} - Coins: ${onlineVisitors[0].coins}`; // Update the nav menu

  visitors.forEach((visitor) => {
    const option = document.createElement("option");
    option.textContent = visitor.name;
    option.value = visitor.name;
    selectElement.appendChild(option);
  });
  function updateVisitorInfo(selectedVisitor) {
    onlineVisitors[0] = selectedVisitor; // Set as the current online visitor
    console.log(selectedVisitor);
    localStorage.setItem("onlineVisitors", JSON.stringify(onlineVisitors)); // Update local storage
    let visitorInfo = document.getElementById("visitor-info");
    visitorInfo.innerHTML = `${onlineVisitors[0].name} - Coins: ${onlineVisitors[0].coins}`; // Correct property access
    window.location.reload();
  }
  // Attach the event listener to the select element
  selectElement.addEventListener("change", function () {
    const selectedVisitorName = this.value;
    const selectedVisitor = visitors.find(
      (visitor) => visitor.name === selectedVisitorName
    );
    console.log(selectedVisitor);
    if (selectedVisitor) {
      updateVisitorInfo(selectedVisitor); // Update the nav menu without reloading the page
    } else {
      console.error("Selected visitor not found");
    }
  });

  if (onlineVisitors.length > 0) {
    const onlineVisitor = onlineVisitors[0];
    selectElement.value = onlineVisitor.name; // Set the select element to show the online visitor's name
  }

  const resetButton = document.getElementById("reset-button");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      // Clear all local storage data
      localStorage.clear();
      // Redirect to the home page or any other desired page
      window.location.href = "/login.html";
    });
  }

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
    let onlineVisitors =
      JSON.parse(localStorage.getItem("onlineVisitors")) || [];
    // window.location.href = "/animal.html";

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

      visitors = visitors.map((v) => {
        if (v.name === visitor.name) {
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
      renderAnimal();
      renderRelatedAnimals();
      const dialog = document.getElementById("feed-dialog");
      dialog.style.display = "block";
      const closeButton = document.getElementById("close-dialog");
      closeButton.addEventListener("click", () => {
        dialog.style.display = "none";
        window.location.reload();
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
    let onlineVisitors =
      JSON.parse(localStorage.getItem("onlineVisitors")) || [];
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
        (v) => v.visitorName !== visitor.name
      );
      localStorage.setItem("onlineVisitors", JSON.stringify(onlineVisitors));

      // Remove the visitor from the visitors array
      let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
      visitors = visitors.filter((v) => v.name !== visitor.name);
      localStorage.setItem("visitors", JSON.stringify(visitors));

      const dialog = document.getElementById("eaten-dialog");
      dialog.style.display = "block";
      document.getElementById("eaten-dialog-text").innerText =
        visitor.name + " got eaten by a predator!";
      const closeButton = document.getElementById("close-eaten-dialog");
      closeButton.addEventListener("click", () => {
        dialog.style.display = "none";
        window.location.href = "/login.html";
      });
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
        const dialogText = document.getElementById("escaped-dialog-text");
        dialogText.innerText =
          selectedAnimal.name + " has escaped from the zoo!";
        const dialog = document.getElementById("escaped-dialog");
        dialog.style.display = "block";

        // Close button logic
        const closeButton = document.getElementById("close-escaped-dialog");
        closeButton.onclick = function () {
          dialog.style.display = "none";
          window.location.href = "/zoo.html";
        };
      }
    }
  }
});
