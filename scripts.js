const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

const movieList = document.createElement('ul');
movieList.setAttribute('id', 'movie-list')

const filterInput = document.createElement('input');
filterInput.setAttribute('id', 'filterInput');
filterInput.setAttribute('type', 'text');
filterInput.setAttribute('placeholder', 'Search titles');

const filterContainer = document.createElement('div');
filterContainer.setAttribute('id', 'filterContainer');

container.appendChild(filterContainer);
filterContainer.appendChild(filterInput);

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {

      const card = document.createElement('li');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(movieList);
      movieList.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);

      
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();

let filterInputSearch = document.getElementById('filterInput');

filterInputSearch.addEventListener('keyup', filterTitles);

function filterTitles() {
  // get value of input 
  let filterValue = document.getElementById('filterInput').value.toUpperCase();
  
  let ul = document.getElementById('movie-list');

  let li = ul.querySelectorAll('li');

  // go through the li items

  for(let i=0;i < li.length;i++) {
    let movieTitle = li[i].getElementsByTagName('h1')[0];
    // if matched  
    if (movieTitle.innerHTML.toUpperCase().indexOf(filterValue) > -1){
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

// try this - https://github.com/damian-balas/filterable-list/blob/master/main.js
