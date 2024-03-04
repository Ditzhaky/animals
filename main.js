// מערכים גלובלים שישמשו אותנו בכל העמודים

let onlineVisitors = JSON.parse(localStorage.getItem("onlineVisitors")) || [];
//מציגה אורחים בדרופ דאון
function populateVisitorOptions(selectElement, visitors) {
  visitors.forEach((visitor) => {
    const option = document.createElement("option");
    option.textContent = visitor.name;
    option.value = visitor.name;
    selectElement.appendChild(option);
  });
}
//updates the require data with event listener
function handleVisitorSelection(
  selectElement,
  visitors,
  updateVisitorInfoCallback,
  loadExistingFiltersCallback
) {
  selectElement.addEventListener("change", function () {
    const selectedVisitorName = this.value;
    const selectedVisitor = visitors.find(
      (visitor) => visitor.name === selectedVisitorName
    );

    if (selectedVisitor) {
      updateVisitorInfoCallback(selectedVisitor);

      if (clearSearchAndFiltersCallback) {
        clearSearchAndFiltersCallback();
      }

      if (loadExistingFiltersCallback) {
        loadExistingFiltersCallback();
      }

      // Make sure this function is accessible in this context
    } else {
      console.error("Selected visitor not found");
    }
  });
}
//handle the selection
function selectOnlineVisitor(selectElement, onlineVisitors) {
  if (onlineVisitors.length > 0) {
    const onlineVisitor = onlineVisitors[0]; // Assuming the first visitor is the currently online one
    selectElement.value = onlineVisitor.name; // Set the dropdown to show the online visitor's name
  }
}
// resets the data in the local storage
function setupResetButton(buttonId, redirectUrl) {
  const resetButton = document.getElementById(buttonId);
  if (resetButton) {
    resetButton.addEventListener("click", function (event) {
      // Prevent any default action or event propagation that might interfere
      event.preventDefault();
      event.stopPropagation();
      localStorage.clear(); // Clears all local storage data
      window.location.href = redirectUrl; // Redirects to the specified URL
    });
  }
}
//מערך של תמונות
const stockImages = [
  "images/avatar.png",
  "images/male5.webp",
  "images/male6.jpg",
  "images/male7.jpg",
  "images/man5.jpg",
  "images/beautiful-woman-avatar.jpg",
  "images/beautiful-woman-avatar2.jpg",
  "images/beautiful-woman-avatar3.jpg",
  "images/beautiful-woman-avatar6.jpg",
  "images/beautiful-woman4.jpg",
  "images/beautiful-woman5.jpg",
  "images/male8.jpg",
  "images/woman1.jpg",
];
let visitors = [
  {
    name: "John Smith",
    coins: 50,
  },
  {
    name: "Emily Johnson",
    coins: 50,
  },
  {
    name: "Michael Williams",
    coins: 50,
  },
  {
    name: "Jessica Brown",
    coins: 50,
  },
  {
    name: "Christopher Jones",
    coins: 50,
  },
  {
    name: "Ashley Davis",
    coins: 50,
  },
  {
    name: "Matthew Miller",
    coins: 50,
  },
  {
    name: "Amanda Wilson",
    coins: 50,
  },
  {
    name: "David Moore",
    coins: 50,
  },
  {
    name: "Sarah Taylor",
    coins: 50,
  },
  {
    name: "James Anderson",
    coins: 50,
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
  },
  {
    name: "Robert Jackson",
    coins: 50,
  },
  {
    name: "Elizabeth White",
    coins: 50,
  },
  {
    name: "Daniel Harris",
    coins: 50,
  },
  {
    name: "Melissa Martin",
    coins: 50,
  },
  {
    name: "William Thompson",
    coins: 50,
  },
  {
    name: "Linda Garcia",
    coins: 50,
  },
  {
    name: "Joseph Martinez",
    coins: 50,
  },
  {
    name: "Karen Robinson",
    coins: 50,
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    Image: "images/lion.jpg",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    Image: "images/elephant.avif",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    Image: "images/giraffe.png",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    Image: "images/tiger.webp",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    Image: "images/monkey.jpg",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    Image: "images/kangaroo.avif",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
    Image: "images/penguin.jpg",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    Image: "images/zebra.webp",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    Image: "images/cheetah.jpg",
  },
];

// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  console.log(visitors);
  console.log(animals);
}
generateDataset();

//********************** */
function logout() {
  //ממשו את הלוגיקה שמתנתקת מאורח מחובר
  // שימו לב לנקות את השדה המתאים בלוקל סטורג'
  let onlineVisitors = JSON.parse(localStorage.getItem("onlineVisitors")) || [];

  if (onlineVisitors.length === 0) {
    console.log("No visitor is logged in.");
  } else {
    // let visitorName = onlineVisitors[onlineVisitors.length - 1].visitorName; // Get the name of the last visitor in the array

    let confirmLogout = confirm(
      `${onlineVisitors[0].name} is already logged in, please log out first.`
    );
    if (confirmLogout) {
      onlineVisitors.pop(); // Remove existing visitor
      localStorage.setItem("onlineVisitors", JSON.stringify(onlineVisitors));
      console.log("Logged out successfully.");
    } else {
      console.log("Logout canceled.");
    }
  }
}
