function createNewVisitor(event) {
  // ביטול התנהגות דיפולטיבית של שליחת טופס
  // קראו עוד כאן: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  event.preventDefault();

  // צרו אורח חדש כאן 👇
  // ניתן לפצל את הלוגיקה למספר בלתי מוגבל של פונקציות.
  // כמו שיותר מפוצל וטהור - פונקציות עם מטרה יחידה ושם משמעותי שמסביר מה הפונקציה עושה ומחזירה
  // דוגמא:

  const validateFormInputs = () => {
    const fullName = document.getElementById("full-name").value;

    if (!fullName) {
      alert("Please fill out all fields");
      return false; // Return false if validation fails
    }

    return true; // Return true if validation succeeds
  };
  if (!validateFormInputs()) {
    return false; // Exit the function and prevent form submission if validation fails
  }

  // Define the visitorExists function
  const visitorExists = (name) => {
    const storedVisitors = JSON.parse(localStorage.getItem("visitors")) || [];
    return storedVisitors.some((visitor) => visitor.name === name);
  };

  // Retrieve the value of the full name input field
  const fullName = document.getElementById("full-name").value;

  // Check if the visitor already exists
  if (visitorExists(fullName)) {
    // Display alert if the name already exists
    alert(`The name '${fullName}' is already taken by a visitor.`);
  } else {
    // Define the makeVisitor function
    const makeVisitor = (name) => {
      // Retrieve stored visitors
      let visitors = JSON.parse(localStorage.getItem("visitors")) || [];

      // Add the new visitor
      visitors.push({ name, coins: 50 });

      // Update the visitors array in local storage
      localStorage.setItem("visitors", JSON.stringify(visitors));

      // Display success message
      alert(`Welcome, ${name}! You have been registered as a visitor.`);
    };

    makeVisitor(fullName);
    window.location.href = "login.html";
  }
}

/**************************************
  מימשתי עבורכם את ההאזנה לאירוע שליחת טופס
  שימו לב כי האיידי של createForm
  זהה לאיידי של הטופס בעמוד signup.html
  אין לשנות אותו */
const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
