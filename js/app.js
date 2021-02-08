//load api
const searchHandler = () => {
    const searchItem = document.getElementById('search-input')
    const mealContainer = document.getElementById('meal-container')
    const getInputValue = searchItem.value
    const source = getInputValue
    let errorMessage = ""

    // Search Recipe by first letter
    if (getInputValue.length === 1 || getInputValue == "") {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${source}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => getRecipes(data.meals))
            .catch(() => {
                const searchResult = document.getElementById('search-result')
                errorMessage +=
                    `<div class="card-body bg-light text-dark">
                <p class="card-title">Search result not found.</p>
            </div>`
                searchResult.innerHTML = errorMessage
                mealContainer.innerHTML = ""
            });

    }

    // Search Recipe by name
    if (getInputValue.length > 1) {
        const api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${source}`;
        fetch(api)
            .then((response) => response.json())
            .then((data) => getRecipes(data.meals))
            .catch(() => {
                const searchResult = document.getElementById('search-result')
                errorMessage +=
                    `<div class="card-body bg-light text-dark">
                <p class="card-title">Search result not found.</p>
            </div>`
                searchResult.innerHTML = errorMessage
                mealContainer.innerHTML = ""
            });
    }
}


// get all recipes by search
const getRecipes = (recipes) => {

    const mealContainer = document.getElementById('recipe-container')
    let recipeTemplate = ""

    recipes.forEach(recipe => {
        const { strMeal, strMealThumb, idMeal } = recipe
        recipeTemplate +=
            `
            <a onclick="getRecipeDetails(${idMeal})" href="javascript:void(0)"><div class="card h-100">
                <img src="${strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body bg-light text-dark">
                    <h5 class="card-title fw-bold">${strMeal}</h5>
                </div>
            </div></a>`

        mealContainer.innerHTML = recipeTemplate
    })

    // display total number of meal are found as shown 
    const searchCount = recipes.length
    const searchResult = document.getElementById('search-result')
    const searchValue = document.getElementById('search-input').value
    const searchResultCount =
        `<div class="card-body bg-light text-dark rounded mb-5">
        <p class="card-title">${searchCount} recipe results for "${searchValue}"</p>
    </div>`
    searchResult.innerHTML = searchResultCount

    // search input value default
    document.getElementById('search-input').value = '';
}



// Lookup full meal details by id
const getRecipeDetails = (id) => {
    document.getElementById('single-preview').style.display = "flex";

    const api = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(api)
        .then((response) => response.json())
        .then((data) => singlePreview(data.meals))

}

