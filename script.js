const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlPoster = 'https://image.tmdb.org/t/p/w500';

function apiSearch(event) {
    event.preventDefault(); //prevent page reloading

    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=97dbdeb9df27f6e01c083e4a7eae4d9a&language=en-US&query=' + searchText;
    movie.innerHTML = 'Loading...';

    fetch(server)
        .then((value) => {
            if (value.status !== 200) {
                return Promise.reject(new Error(value.status));
            }
            return value.json();
        })
        .then((output) => {
            let inner = '';
            output.results.forEach(function(item) {
                let nameItem = item.name || item.title;
                inner += `<div class="col-3 item">
                <img src="${urlPoster + item.poster_path}" alt="${item.name}">
                <h5>${nameItem}</h5>
                </div>`;
            });

            movie.innerHTML = inner;
        })
        .catch((reason) => {
            movie.innerHTML = 'Sorry, something went wrong';
            console.log('error ' + reason.status);
        });

}

searchForm.addEventListener('submit', apiSearch);