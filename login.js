// תממשו את הלוגיקה של בחירת אורח שנכנס לגן החיות
// שמרו את האורח שבחרתם, בלוקל סטורג' כך שבכל העמודים נדע מי האורח הנוכחי
document.addEventListener("DOMContentLoaded", function () {
  addArraysForNewVisitors(); // This will add 'visitedAnimals' and 'favoriteAnimals' to those visitors who don't have them
  function addArraysForNewVisitors() {
    visitors.forEach((visitor) => {
      // Check if the visitor doesn't have the 'visitedAnimals' array
      if (!visitor.visitedAnimals) {
        visitor.visitedAnimals = []; // Initialize 'visitedAnimals' as an empty array
        localStorage.setItem("visitors", JSON.stringify(visitors));
      }

      // Check if the visitor doesn't have the 'feededAnimals' array
      if (!visitor.feededAnimals) {
        visitor.feededAnimals = []; // Initialize 'favoriteAnimals' as an empty array
        localStorage.setItem("visitors", JSON.stringify(visitors));
      }
    });
  }

  function loginAsVisitor(visitorName) {
    let onlineVisitors =
      JSON.parse(localStorage.getItem("onlineVisitors")) || [];
    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];

    // Find the visitor in the visitors array
    let visitor = visitors.find((v) => v.name === visitorName);

    if (!visitor) {
      alert("Visitor not found. Please sign up first.");
      return;
    }

    // Check if the array is empty
    if (onlineVisitors.length === 0) {
      // Array is empty, so push the new visitor with their coins
      onlineVisitors.push({
        name: visitorName,
        coins: visitor.coins,
        visitedAnimals: [],
        feededAnimals: [],
      });
      localStorage.setItem("onlineVisitors", JSON.stringify(onlineVisitors));
      alert("Welcome to the zoo, " + visitorName);

      // Redirect to the zoo page
      window.location.href = "zoo.html"; // Replace "zoo.html" with the actual URL of your zoo page
    } else {
      logout();
    }
  }

  function selectVisitor(visitorName) {
    loginAsVisitor(visitorName); // Call the loginAsVisitor function with the visitor name
  }

  // Retrieve visitor data from local storage
  visitors = JSON.parse(localStorage.getItem("visitors")) || [];

  // Get the container for visitor cards
  visitorCardsContainer = document.getElementById("visitor-cards");

  // Create a card for each visitor
  visitors.forEach((visitor) => {
    // Create a card element
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.visitor = visitor.name;

    // Create elements for visitor data
    const nameElement = document.createElement("h2");
    nameElement.textContent = visitor.name;

    const coinsElement = document.createElement("p");
    coinsElement.textContent = `Coins: ${visitor.coins}`;

    const imageElement = document.createElement("img");
    const randomIndex = Math.floor(Math.random() * stockImages.length); // randomly puts an integer inside randomIndex
    imageElement.src = stockImages[randomIndex]; //puts a random photo inside visitor card by the randomIndex

    // Append elements to the card
    card.appendChild(nameElement);
    card.appendChild(coinsElement);
    card.appendChild(imageElement);
    card.addEventListener("click", function () {
      selectVisitor(visitor.name);
    });

    // Append card to the container
    visitorCardsContainer.appendChild(card);
  });
  visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  visitorCardsContainer = document.getElementById("visitor-cards");
  const searchInput = document.getElementById("search-input");

  // Function to filter visitors based on search input
  function filterVisitors(searchTerm) {
    const filteredVisitors = visitors.filter((visitor) =>
      visitor.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    // Show or hide visitor cards based on the filtered visitors
    visitors.forEach((visitor) => {
      const card = document.querySelector(
        `.card[data-visitor="${visitor.name}"]`
      );
      if (filteredVisitors.includes(visitor)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Event listener for input in the search field
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.trim();
    filterVisitors(searchTerm);
  });
});
