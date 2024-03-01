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

  showVisitedAnimals();
  showFeededAnimals();
  showFavoriteAnimal();
  function showVisitedAnimals() {
    // Retrieve online visitors from local storage
    visitors = JSON.parse(localStorage.getItem("visitors")) || [];

    // Check if there is a visitor logged in
    if (onlineVisitors.length === 0) {
      console.log("No visitor is logged in.");
      return; // Exit the function if no visitor is logged in
    }
    let matchingVisitorName = onlineVisitors[0].name;
    console.log(matchingVisitorName);

    // Find the visitor in the visitors array that matches the name from onlineVisitors[0]
    let visitorIndex = visitors.findIndex(
      (visitor) => visitor.name === matchingVisitorName
    );

    // Access the visitedAnimals array of the logged-in visitor
    let visitedAnimals = visitors[visitorIndex].visitedAnimals || [];
    console.log(visitedAnimals);

    // Display the visited animals on the dashboard
    let visitedAnimalsDiv = document.getElementById("visited-animals");
    visitedAnimalsDiv.innerHTML = ""; // Clear previous content

    // Update the headline with the visitor's name
    let headline = document.createElement("h2");
    headline.textContent = "Visited animals of " + visitors[visitorIndex].name;
    visitedAnimalsDiv.appendChild(headline);

    if (visitedAnimals.length === 0) {
      let message = document.createElement("p");
      message.textContent = "No animals visited yet.";
      visitedAnimalsDiv.appendChild(message);
    } else {
      visitedAnimals.forEach((animal) => {
        let animalElement = document.createElement("div");
        animalElement.textContent = animal.name; // Display the name of the visited animal
        visitedAnimalsDiv.appendChild(animalElement);
      });
    }
  }

  function showFeededAnimals() {
    visitors = JSON.parse(localStorage.getItem("visitors")) || [];

    if (onlineVisitors.length === 0) {
      console.log("No visitor is logged in.");
      return;
    }

    let matchingFeedingName = onlineVisitors[0].name;
    console.log(matchingFeedingName);
    let visitorIndex = visitors.findIndex(
      (visitor) => visitor.name === matchingFeedingName
    );

    // Assuming the property is named 'fedAnimals' and using camelCase
    let fedAnimals = visitors[visitorIndex].feededAnimals || [];
    console.log(fedAnimals);

    let fedAnimalsDiv = document.getElementById("feeded-animals");
    fedAnimalsDiv.innerHTML = ""; // Ensure this line is uncommented to clear previous content

    let headline = document.createElement("h2");
    headline.textContent = "Fed animals of " + visitors[visitorIndex].name;
    fedAnimalsDiv.appendChild(headline);

    if (fedAnimals.length === 0) {
      let message = document.createElement("p");
      message.textContent = "No animals fed yet.";
      fedAnimalsDiv.appendChild(message);
    } else {
      fedAnimals.forEach((animal) => {
        let animalElement = document.createElement("div");
        animalElement.textContent = animal.name; // Assuming 'name' is the correct property in animal objects
        fedAnimalsDiv.appendChild(animalElement);
      });
    }
  }

  function showFavoriteAnimal() {
    // Retrieve online visitors from local storage
    let onlineVisitors =
      JSON.parse(localStorage.getItem("onlineVisitors")) || [];

    // Check if there is a visitor logged in
    if (onlineVisitors.length === 0) {
      console.log("No visitor is logged in.");
      return; // Exit the function if no visitor is logged in
    }

    // Assuming only one visitor is logged in
    let favorite = onlineVisitors[0];
    let visitorIndex = visitors.findIndex(
      (visitor) => visitor.name === favorite.name
    );

    // Access the visitedAnimals array of the logged-in visitor
    let visitedAnimals = visitors[visitorIndex].visitedAnimals || [];

    // Count occurrences of each animal
    let animalCounts = {};
    visitedAnimals.forEach((animal) => {
      animalCounts[animal.name] = (animalCounts[animal.name] || 0) + 1;
    });

    // Find the animal with the maximum occurrences
    let favoriteAnimal = null;
    let maxCount = 0;
    for (let animalName in animalCounts) {
      if (animalCounts[animalName] > maxCount) {
        maxCount = animalCounts[animalName];
        favoriteAnimal = animalName;
      }
    }

    // Display the favorite animal on the dashboard
    let favoriteAnimalDiv = document.getElementById("favorite-animal");
    favoriteAnimalDiv.innerHTML = ""; // Clear previous content
    let headline = document.createElement("h2");
    headline.textContent = "Favorite Animal of " + visitors[visitorIndex].name;
    favoriteAnimalDiv.appendChild(headline);
    if (favoriteAnimal) {
      let favoriteAnimalElement = document.createElement("div");
      favoriteAnimalElement.textContent = favoriteAnimal;
      favoriteAnimalDiv.appendChild(favoriteAnimalElement);
    } else {
      let message = document.createElement("p");
      message.textContent = "No favorite animal found.";
      favoriteAnimalDiv.appendChild(message);
    }
  }
});
