const listOfFood = document.getElementById('mealItems');

const warning = document.getElementById('warning');

const allFoodsDetails = document.getElementById('allFoodsDetails')


const searchMeal = () => {
    const foodName = document.getElementById('search-field').value
    // console.log(foodName);
    listOfFood.innerHTML = ''
    allFoodsDetails.innerHTML = ''
    if (foodName === '') {
        warning.style.display = 'block';
    } else {
        getInputValue(foodName)
        warning.style.display = 'none';
    }

    document.getElementById('search-field').value = ""
})


const getInputValue = (foodName) => {

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data.meals);
            displayMenu(data.meals)
        })
}


const displayMenu = foods => {
    console.log(foods);
    // console.log(foods.meals[0].strMeal);

    if (foods != null) {
        const mealItems = listOfFood
        foods.map(foods => {
            // console.log(foods.categories.strCategory);
            console.log(foods.strMeal);
            console.log(foods.strMealThumb);
            const foodDiv = document.createElement('div')
            foodDiv.className = "foods"
            const foodInfo = `
                <div onclick="displayDetails('${foods.idMeal}')">
                <img src="${foods.strMealThumb}">
                <h3>${foods.strMeal}</h3> 
               </div>
              
            `
            foodDiv.innerHTML = foodInfo
            mealItems.appendChild(foodDiv)
        })


    }

    else {
        warning.style.display = 'block';
        warning.innerText = 'Please Enter Valid Food Name'
        warning.style.color = 'red'
        warning.style.backgroundColor = 'gray'
        warning.style.padding = '20px'
        warning.style.color = 'red'
        warning.style.fontSize = 'bold'

    }
}

const displayDetails = idMeals => {

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`;

    console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);

        });
};

const renderFoodInfo = food => {

    const mealItemsDiv = allFoodsDetails

    mealItemsDiv.innerHTML = `
   
    <img src="${food.strMealThumb}" alt="">

    <h2>${food.strMeal}</h2>
    
    <h3 >Ingredients</h3>

    <ul class="mb-0">
        <li> </i> ${food.strIngredient1}</li>
        <li> </i> ${food.strIngredient2}</li>
        <li> </i> ${food.strIngredient3}</li>
        <li> </i> ${food.strIngredient4}</li>
        <li> </i> ${food.strIngredient5}</li>
        <li> </i> ${food.strIngredient6}</li>
        <li> </i> ${food.strIngredient7}</li>
        <li> </i> ${food.strIngredient8}</li>
        <li> </i> ${food.strIngredient9}</li>
        <li> </i> ${food.strIngredient10}</li>
     
        </ul>
   
   
    `


};

