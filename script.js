const search =document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealEl = document.getElementById('meals');
const resultHeading = document.getElementsByClassName('result-heading');
const single_mealEl = document.getElementById('single-meal');

// search meal
function searchMeal(e){
    e.preventDefault();

    //clear single meal
    single_mealEl.innerHTML="";

    //get search Meal
    const term = search.value;

    // check for Empty
    if(term.trim()){
           fetch(
               `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
             )
             .then((res) => res.json())
           .then((data) =>  {
               console.log(data);
               resultHeading.innerHTML = `<h2> Search Result for ${term}</h2>`
                if(data.meals === null){
                    resultHeading.innerHTML = `<h2>There Are No Result for ${term}</h2>`
                }else{
                    mealEl.innerHTML = data.meals.map(
                        (meal) => `
                        <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                        </div>
                        </div>
                        `
                    )
                    .join("");
                }
            });
            
    
          
    } else {
        alert("please insert a value in Search");
    }
}

//  
function getMealById(mealID) {
    fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    )
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
       const meal = data.meals[0];
       addMealToDOM(meal);
    });
}

// Random Meal
function randomMeal(){
    mealEl.innerHTML="";
    resultHeading.innerHTML="";


    fetch(
        'https://www.themealdb.com/api/json/v1/1/random.php'
    ).then(res => res.json()).then(data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    });
}

// add meal to dom

function addMealToDOM(meal){
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
         
        if(meal[`strIngredients${i}`]) {
            ingredients.push(
            `${meal[`strIngredients${i}`]} - ${
             meal[`strMeasure${i}`]
        }`
    );
    } else {
            break;
        }
    }


    single_mealEl.innerHTML = `
    <div class="single-meal">
     <h1>${meal.strMeal}</h2>
     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
     <div class="single-meal-info">
     ${meal.strCategory ? `<p>${meal.strCategory}</p>`:''}
     ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
     </div>
     <div class="main">
         <p>${meal.strInstructions} </p>
     
         </div>
    </div>
    `

}


// event listerners

submit.addEventListener('submit', searchMeal);
random.addEventListener('click',randomMeal);
mealEl.addEventListener('click',e => {
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains("meal-info");
        }else{
            return false;
        }
    });
    if(mealInfo){
        const mealID = mealInfo.getAttribute("data-mealID");
        getMealById(mealID);

    }
})


