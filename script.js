function search() {
    document.getElementById('suggestion').classList.add('d-none');
    let userInput = document.getElementById('user-input').value;
    userInput.textContent = '';
    if (userInput === '') {
        blank = document.querySelector('#user-input');
        blank.placeholder = 'Try some food Bitch';
    }
    else {
        const mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
        fetch(mealUrl)
            .then(response => response.json())
            .then(data => displaySearchResults(data.meals))
            .catch(err => console.log('Fuck Yourself Bitch'))
    }
}


function displaySearchResults(meals) {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    for (const meal of meals) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
          <div onclick="mealDetail(${meal.idMeal})" class="card">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
            </div>
          </div>
        `;
        searchResult.appendChild(div);
    }
}

function mealDetail(meal){
    window.scrollTo(0, 40);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayMeal(data.meals[0]))
}


const displayMeal = meal => {
    const mealDetail = document.getElementById('meal-details')
    mealDetail.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top img-fluid" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
        <a href="${meal.strYoutube}" class="btn btn-secondary">See Video</a>
    </div>
    `;
    mealDetail.appendChild(div)
}