let recipes = JSON.parse(localStorage.getItem("recipes")) || [];


function saveRecipes() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}


function addRecipe() {
    let name = document.getElementById("recipeName").value.trim();
    let ingredients = document.getElementById("ingredients").value.trim();
    let instructions = document.getElementById("instructions").value.trim();
    let time = document.getElementById("time").value.trim();
    let difficulty = document.getElementById("difficulty").value;

    if (!name || !ingredients || !instructions || !time) {
        alert("Please fill out all fields.");
        return;
    }

    let editIndex = localStorage.getItem("editIndex");

    if (editIndex !== null) {
        
        recipes[editIndex] = {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            time: time,
            difficulty: difficulty
        };
        localStorage.removeItem("editIndex");
    } else {
        
        recipes.push({
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            time: time,
            difficulty: difficulty
        });
    }

    saveRecipes();
    window.location.href = "recipes.html";
}


function loadRecipes() {
    let container = document.getElementById("recipeContainer");
    if (!container) return;

    container.innerHTML = "";

    recipes.forEach((recipe, index) => {
        let card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Time:</strong> ${recipe.time}</p>
            <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
            <p><strong>Instructions:</strong><br>${recipe.instructions}</p>

            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})" style="background-color: firebrick;">Delete</button>
        `;

        container.appendChild(card);
    });
}


function deleteRecipe(index) {
    let confirmDelete = confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    recipes.splice(index, 1);
    saveRecipes();
    location.reload();
}

function editRecipe(index) {
    localStorage.setItem("editIndex", index);
    window.location.href = "add-recipe.html";
}


function loadEditData() {
    if (!window.location.pathname.includes("add-recipe.html")) return;

    let index = localStorage.getItem("editIndex");
    if (index === null) return;

    let recipe = recipes[index];

    document.getElementById("recipeName").value = recipe.name;
    document.getElementById("ingredients").value = recipe.ingredients;
    document.getElementById("instructions").value = recipe.instructions;
    document.getElementById("time").value = recipe.time;
    document.getElementById("difficulty").value = recipe.difficulty;

    document.getElementById("saveBtn").textContent = "Update Recipe";
}


window.onload = function () {
    loadRecipes();
    loadEditData();
};