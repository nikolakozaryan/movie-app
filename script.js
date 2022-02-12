const main = document.querySelector('main')
const search = document.querySelector('input')
const inputValue = !localStorage.searchValue ? '' : localStorage.searchValue;

async function getData() {
    const url = getURL();
    const res = await fetch(url);
    const data = await res.json();
    showResult(data)
}

const showResult = (data) => {
    if (data.results.length) {
        const result = data.results.map(item => fillItem(item));
        search.value = inputValue;
        main.append(...result)
    }
    else {
        document.querySelector('.error').classList.add('visible')
    }
    localStorage.clear();
}

const createItem = () => {
    const item = document.createElement('div');
    item.classList.add('movie-item');
    item.innerHTML = `<img class='poster'><div class="summary">
                        <h2 class="title"></h2>
                        <div class="rating"></div>
                      </div>
                      <div class="overview">
                        <h3>Overview</h3>
                        <p class="text"></p>
                      </div>`;
    return item;
}

const fillItem = (data) => {
    const item = createItem();
    const rating = item.querySelector('.rating');
    item.querySelector('.poster').src = data.poster_path ? 'https://image.tmdb.org/t/p/w1280' + data.poster_path : './assets/default_poster.jpg';
    item.querySelector('.poster').alt = data.original_title;
    item.querySelector('.title').textContent = data.original_title;
    rating.textContent = data.vote_average;

    if (+data.vote_average >= 8) rating.classList.add('good')
    else if (+data.vote_average >= 5 && +data.vote_average < 8) rating.classList.add('medium')
    else rating.classList.add('bad')

    item.querySelector('.text').textContent = data.overview ? data.overview : 'Sorry, there is no description.';
    return item;
}

const getURL = () => {
    return !inputValue ? 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e0cca0c7a1e699ebd6b6fedf20ecdba' : `https://api.themoviedb.org/3/search/movie?query=${localStorage.searchValue}&api_key=9e0cca0c7a1e699ebd6b6fedf20ecdba`
}

getData()

search.addEventListener('change', () => {
    localStorage.setItem('searchValue', search.value);
    document.location.reload()
});