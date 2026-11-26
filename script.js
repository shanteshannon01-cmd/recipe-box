console.log("Hello World");

const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

async function loadRecipe() {

    if (input.value === "") {
      statusText.textContent = "Please enter  a number!";
      return;
    }
    recipeArea.textContent = "";
    statusText.textContent = "Loading...";
    try{

    const url = "https://dummyjson.com/recipes/" + input.value;

    
    const response = await fetch(url);

    if (!response.ok) {
      statusText.textContent = "No recipe with that number. Try 1 to 50.";
      return;
    }

    const recipe = await response.json();
    statusText.textContent = " ";

    const card = document.createElement("div");
    card.className = "card p-3";

    const title = document.createElement("h2");
    title.className = "h4";
    title.textContent = recipe.name;
    card.appendChild(title);

    const cuisine = document.createElement("p");
    cuisine.textContent = "Cuisine: " + recipe.cuisine;
    card.appendChild(cuisine);

    const prepTime = document.createElement("p");
    prepTime.textContent = "Ready in " + recipe.prepTimeMinutes + " minutes";
    card.appendChild(prepTime);

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.className = "mb-2 rounded-2";
    card.appendChild(img);

    recipeArea.appendChild(card);
    input.value = "";
  } catch (error) {
    statusText.textContent = "Server cannot be reached. Check connection.";
  }
}

button.addEventListener("click", loadRecipe);

const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

async function addDish() {

  if (dishInput.value === "") {
    postStatus.textContent = "Type a dish name first.";
    return;
  }
  savedArea.textContent = " ";
  postStatus.textContent="Sending...";
    try {
  const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: dishInput.value }),
  });

  if (!response.ok) {
      postStatus.textContent = "The server didn't add it. Try again.";
      return;
    }
  const newDish = await response.json();
  postStatus.textContent="";
  console.log(newDish);

  const message = document.createElement("p");
  message.className = "alert alert-success";
  message.textContent = 'Added "' + newDish.name + '" as recipe #' + newDish.id;
  savedArea.appendChild(message);
  dishInput.value = "";
} catch (error){
 postStatus.textContent="Can't reach the recipe server. Check your internet.";
}
}
postButton.addEventListener("click", addDish);
