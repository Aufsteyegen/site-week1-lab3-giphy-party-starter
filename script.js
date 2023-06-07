// Global Constants
const apiKey = "p0rhY87L2Y6UIdyQPqYIdwOxwUTePYRn"
const limit = 30
const rating = "g"
const lang = "en"
let query = ""
let queryData = {}
let curPage = 1
let offset = 0

const searchForm = document.querySelector("#search-form")
const searchInput = document.querySelector("#search-input")
const submitButton = document.querySelector("#search-button")

const gifsDiv = document.querySelector(".gifs")
const moreButton = document.querySelector(".button-hidden")

/**
 * Update the DOM to display results from the Giphy API query.
 *
 * @param {Object} results - An array of results containing each item
 *                           returned by the response from the Giphy API.
 *
 */
function displayResults(results) {
    offset = curPage * 30;
    if (curPage == 1) {
        gifsDiv.innerHTML = ``
    }
    for (let i = 0; i < 30; i++) {
        gifsDiv.innerHTML += `
        <img src=${results.data[i].images.original.url}/>
    `
    }
    console.log(curPage);
}

/**
 * Make the actual `fetch` request to the Giphy API
 * and appropriately handle the response.
 *
 * @param {String} searchTerm - The user input text used as the search query
 *
 */
async function getGiphyApiResults(searchTerm) {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    queryData = data;
    displayResults(queryData);
}

/**
 * The function responsible for handling all form submission events.
 *
 * @param {SubmitEvent} event - The SubmitEvent triggered when submitting the form
 *
 */
async function handleFormSubmit(event) {
    curPage = 1
    moreButton.style.display = "block"
    query = searchInput.value
    getGiphyApiResults(query)
    console.log('The form was submitted.')
    searchInput.value = ""
    event.preventDefault()
}

searchForm.addEventListener("submit", handleFormSubmit)
submitButton.addEventListener("click", handleFormSubmit)

/**
 * Handle fetching the next set of results from the Giphy API
 * using the same search term from the previous query.
 *
 * @param {MouseEvent} event - The 'click' MouseEvent triggered by clicking the 'Show more' button
 *
 */
async function handleShowMore(event) {
    curPage += 1;
    getGiphyApiResults(query);
}

moreButton.addEventListener("click", handleShowMore)

window.onload = function () {
  // YOUR CODE HERE
    
}   
