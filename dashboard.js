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
    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    if (onlineVisitors.length === 0) {
      console.log("No visitor is logged in.");
      return;
    }

    let matchingVisitorName = onlineVisitors[0].name;
    let visitorIndex = visitors.findIndex(
      (visitor) => visitor.name === matchingVisitorName
    );
    let visitedAnimals = visitors[visitorIndex].visitedAnimals || [];
    console.log(visitedAnimals.length);
    let animalVisitCounts = {};

    visitedAnimals.forEach((animal) => {
      if (animalVisitCounts.hasOwnProperty(animal.name)) {
        // If the animal name is already in the object, increment the count
        animalVisitCounts[animal.name]++;
      } else {
        // If the animal name is not in the object, initialize it with a count of 1
        // Assuming each entry in visitedAnimals has a 'name' property
        animalVisitCounts[animal.name] = 1;
      }
    });

    // Prepare data for the chart
    let labels = Object.keys(animalVisitCounts); // Animal names
    let data = Object.values(animalVisitCounts); // Corresponding visit counts// Assuming each animal has a 'visits' count

    renderChart(labels, data, "visitedAnimalsChart", "Visited Animals");
  }
  function renderChart(labels, data, canvasId, title) {
    let ctx = document.getElementById(canvasId).getContext("2d");
    new Chart(ctx, {
      type: "bar", // or 'line', 'doughnut', etc.
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              // Controls the ticks on the Y-axis
              stepSize: 1, // Sets the step size between ticks on the Y-axis
              // You can also set the minimum and maximum values if you like
              // min: 0,
              // max: 100,
            },
          },
        },
      },
    });
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
    let animalFeedCounts = {};

    fedAnimals.forEach((animal) => {
      if (animalFeedCounts.hasOwnProperty(animal.name)) {
        // If the animal name is already in the object, increment the count
        animalFeedCounts[animal.name]++;
      } else {
        // If the animal name is not in the object, initialize it with a count of 1
        animalFeedCounts[animal.name] = 1;
      }
    });
    let labels = Object.keys(animalFeedCounts); // Animal names
    let data = Object.values(animalFeedCounts); // Corresponding visit counts// Assuming each animal has a 'visits' count

    renderChart(labels, data, "fedAnimalsChart", "Visited Animals");
  }

  function showFavoriteAnimal() {
    let onlineVisitors =
      JSON.parse(localStorage.getItem("onlineVisitors")) || [];

    if (onlineVisitors.length === 0) {
      console.log("No visitor is logged in.");
      return;
    }

    let favorite = onlineVisitors[0];
    let visitorIndex = visitors.findIndex(
      (visitor) => visitor.name === favorite.name
    );
    let visitedAnimals = visitors[visitorIndex]?.visitedAnimals || [];

    let animalCounts = {};
    visitedAnimals.forEach((animal) => {
      animalCounts[animal.name] = (animalCounts[animal.name] || 0) + 1;
    });

    let favoriteAnimalName = null;
    let maxCount = 0;
    for (let animalName in animalCounts) {
      if (animalCounts[animalName] > maxCount) {
        maxCount = animalCounts[animalName];
        favoriteAnimalName = animalName;
      }
    }

    let favoriteAnimal = visitedAnimals.find(
      (animal) => animal.name === favoriteAnimalName
    );

    let favoriteAnimalDiv = document.getElementById("favorite-animal");
    favoriteAnimalDiv.innerHTML = ""; // Clear previous content
    let headline = document.createElement("h2");
    headline.textContent = "Favorite Animal of " + favorite.name;
    favoriteAnimalDiv.appendChild(headline);

    if (favoriteAnimal) {
      let favoriteAnimalElement = document.createElement("div");
      favoriteAnimalElement.textContent = favoriteAnimal.name;
      favoriteAnimalDiv.appendChild(favoriteAnimalElement);

      let favoriteAnimalImage = document.createElement("img");
      favoriteAnimalImage.src = favoriteAnimal.Image; // Assuming the URL is stored in favoriteAnimal.Image
      favoriteAnimalImage.alt = `Image of ${favoriteAnimal.name}`;
      favoriteAnimalDiv.appendChild(favoriteAnimalImage);
    } else {
      let message = document.createElement("p");
      message.textContent = "No favorite animal found.";
      favoriteAnimalDiv.appendChild(message);
    }
  }
});
