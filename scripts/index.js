const foodSelector = document.getElementById("foodSelector");
const table = document.getElementById("categoryTable");
const tbody = document.querySelector("#categoryTable tbody");
const nameSelector = document.getElementById("nameSelector");

//Dynamically add Table Headers
const headers = ["Category ID", "Name", "Description", "More Details"];

//Get options for dropdown from api
async function getFoodCategory() {
  const response = await fetch("http://localhost:8081/api/categories/");
  const data = await response.json();
  return data;
}

getFoodCategory();

//Add the options to dropdown from api
async function appendOptions() {
  const options = await getFoodCategory();
  options.forEach((category) => {
    const categoryOptions = new Option(category.name, category.categoryId);
    nameSelector.appendChild(categoryOptions);
  });
}

nameSelector.style.display = "none";

foodSelector.addEventListener("change", () => {
  let selectedCategory = foodSelector.value;

  if (!selectedCategory) {
    table.innerHTML = "";
  }

  if (selectedCategory === "search") {
    nameSelector.style.display = "block";
    appendOptions();
  } else {
    nameSelector.style.display = "none";
  }
});

//Make a table
