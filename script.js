const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(event) {
    event.preventDefault(); //prevent page reloading

    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=97dbdeb9df27f6e01c083e4a7eae4d9a&language=en-US&query=' + searchText;
    requestAPI(server);
}

searchForm.addEventListener('submit', apiSearch);

function requestAPI(url) {
    const request = new XMLHttpRequest();

    request.open('GET', url); //async request
    request.send();

    request.addEventListener('readystatechange', function() {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
            console.log('Error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function(item) {
            let nameItem = item.name || item.title;
            inner += `<div class="col-3">${nameItem}</div>`;
        });

        movie.innerHTML = inner;

    });
}