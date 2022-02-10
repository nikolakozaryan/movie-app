const search = document.querySelector('input')

async function getData() {
    let url = getURL();
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results.map(item => fillItem(item));
    main.append(...result)
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
    item.querySelector('.poster').src = 'https://image.tmdb.org/t/p/w1280' + data.poster_path;
    item.querySelector('.poster').alt = data.original_title;
    item.querySelector('.title').textContent = data.original_title;
    rating.textContent = data.vote_average;

    if (+data.vote_average >= 8) rating.classList.add('good')
    else if (+data.vote_average >= 5 && +data.vote_average < 8) rating.classList.add('medium')
    else rating.classList.add('bad')

    item.querySelector('.text').textContent = data.overview;
    return item;
}

const getURL = () => {
    return !search.value ? 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9e0cca0c7a1e699ebd6b6fedf20ecdba' : `https://api.themoviedb.org/3/search/movie?query=${search.value}&api_key=9e0cca0c7a1e699ebd6b6fedf20ecdba`
}

// search.addEventListener('change', () => console.log('changed'))
const main = document.querySelector('main')

getData()

search.addEventListener('change', () => console.log(getURL()));