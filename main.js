const titleSelectorButton = document.getElementById('titles')
// const reviewSubmitButton = document.getElementById('review-submit-button')
// const showPeople = document.getElementById('show-people')
// const resetReviews = document.getElementById('reset-reviews')
const detailContainer = document.getElementById('film-detail-container')
// const submitFilmSelector = document.getElementById('search')
let reviewInput = document.querySelector('form')
let reviewList = document.getElementById('review-list')
let reviewValue = document.getElementById('review')
let resetReviews = document.getElementById('reset-reviews')
let showPeople = document.getElementById('show-people')

fetch(`https://resource-ghibli-api.onrender.com/films`)
.then(response => response.json())
.then(response => {
    console.log(response)
    populateFormDropDown(response)
})
.catch(err => console.error(err))

let titleList = []
let currentFilm = null

   
    let populateFormDropDown = films => {
        let counter = 0
        for (const film of films) {
            counter += 1 
            titleList.push(film)
            let newOption = document.createElement('option')
            newOption.textContent = film.title
            newOption.value = film.id
            titleSelectorButton.append(newOption)
        }
    }

   let titleHeader;
   let releaseYear;
   let description;


    titleSelectorButton.addEventListener('change', event => {
        // event.preventDefault() this is only for forms
        
        // detailContainer.innerHTML = ''
        
        if(titleHeader) {
            titleHeader.remove()
            releaseYear.remove()
            description.remove()
         }
    
        let filmName = titleSelectorButton.value
        let film = findFilmById(filmName)
        currentFilm = film
    
        titleHeader = document.createElement('h3')
        titleHeader.textContent = film.title
        detailContainer.append(titleHeader)

        releaseYear = document.createElement('p')
        releaseYear.textContent = film.release_date
        detailContainer.append(releaseYear)

        description = document.createElement('p')
        description.textContent = film.description
        detailContainer.append(description)
    
    })

    let findFilmById = id => {
        for (const film of titleList) {
            if(film.id === id) {
                return film
            }
        }
    }

    reviewInput.addEventListener('submit', event => {
        event.preventDefault()
        if(!titleSelectorButton.value) {
            window.alert('Please select a movie first')
            return null
        }
        if(!reviewValue.value) {
            return null
        }
        console.log(reviewValue.value)
        currentFilm = findFilmById(titleSelectorButton.value)
        let newReview = document.createElement('li')
        newReview.innerHTML += `<strong>${currentFilm.title}</strong>` + '--'
        newReview.innerHTML += reviewValue.value
        reviewList.append(newReview)
        reviewValue.value = null
      
    })

    resetReviews.onclick = () => {
        let listElements = reviewList.querySelectorAll('li')
        for (const elements of listElements) {
            elements.remove()
        }
    }


    showPeople.onclick = () => {
        let orderedList = document.querySelector('ol')
        for (const li of orderedList.querySelectorAll('li')) {
            li.remove()
        }
        currentFilm = (findFilmById(titleSelectorButton.value))
        let baseURL = `https://resource-ghibli-api.onrender.com`
        currentFilm.people.forEach(person => {
            fetch(baseURL + person)
            .then(response => response.json())
            .then(json => {
                console.log(json)
        let listElements = document.createElement('li')
        listElements.textContent = json.name
        orderedList.append(listElements)

            }).catch(error => console.log(error))
        })
    }








// submitFilmSelector.addEventListener('click', event => {
//     event.preventDefault()
    
    

//     detailContainer.innerHTML = ''

//     let filmName = titleSelector.title
//     let film = findFilmByName(filmName)
//     currentFilm = film

//      let titleHeader = document.createElement('h3')
//      titleHeader.textContent = film.title
//      detailContainer.append(titleHeader)

//      let description = document.createElement('p')
//      description.textContent = film.description
//      detailContainer.append(description)

// })



// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
 // Add code you want to run on page load here
 
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
