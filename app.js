let data = null;

// Load JSON once
async function loadData() {
    if (!data) {
        const response = await fetch("data/recipes.json");
        data = await response.json();
    }
    return data;
}

// Populate Categories on index.html
async function loadCategories() {
    const info = await loadData();
    const container = document.getElementById("categories");

    info.categories.forEach(cat => {
        const div = document.createElement("div");
        div.className = "category-block";
        div.style.backgroundImage = `url('${cat.image}')`;
        div.onclick = () => {
            window.location.href = `recipes.html?cat=${cat.id}`;
        };

        const title = document.createElement("div");
        title.className = "category-title";
        title.textContent = cat.name;

        div.appendChild(title);
        container.appendChild(div);
    });
}

// Populate recipes per category
async function loadRecipeList() {
    const info = await loadData();

    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("cat");

    const category = info.categories.find(c => c.id === categoryId);

    document.getElementById("categoryName").textContent = category.name;

    const container = document.getElementById("recipeList");

    category.recipes.forEach(r => {
        const div = document.createElement("div");
        div.className = "recipe-item";
        div.onclick = () => {
            window.location.href = `recipe.html?cat=${categoryId}&id=${r.id}`;
        };

        div.innerHTML = `
            <img src="${r.image}">
            <div class="recipe-name">${r.name}</div>
        `;

        container.appendChild(div);
    });
}

// Load recipe details
async function loadRecipePage() {
    const info = await loadData();

    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get("cat");
    const recipeId = params.get("id");

    const category = info.categories.find(c => c.id === categoryId);
    const recipe = category.recipes.find(r => r.id === recipeId);

    document.getElementById("recipeName").textContent = recipe.name;
    document.getElementById("recipeImage").src = recipe.image;

    // Ingredients
    const ingList = document.getElementById("ingredients");
    recipe.ingredients.forEach(i => {
        let li = document.createElement("li");
        li.textContent = i;
        ingList.appendChild(li);
    });

    // Steps
    const stepList = document.getElementById("steps");
    recipe.steps.forEach(s => {
        let li = document.createElement("li");
        li.textContent = s;
        stepList.appendChild(li);
    });
}

