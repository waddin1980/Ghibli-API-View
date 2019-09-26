const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

const sliderWrap = document.createElement('div');
sliderWrap.setAttribute('class', 'slider-wrap');

const slider = document.createElement('input');
slider.setAttribute('class', 'slider');
slider.setAttribute('type', 'range');
slider.setAttribute('min', '1');
slider.setAttribute('max', '100');
slider.setAttribute('value', '5');

container.appendChild(sliderWrap);

sliderWrap.appendChild(slider);

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const cardWrap = document.createElement('div');
      cardWrap.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(cardWrap);
      cardWrap.appendChild(h1);
      cardWrap.appendChild(p);

      let title = movie.title;
      let description = movie.description.substring(0, 300);
      let score = movie.rt_score;
  
      let card = [{title, description, score}];

      let slider = document.querySelector('.slider');
      let sliderValue = slider.value;
      


      const cards = card.map(function(car){
            return title + '|' + description + '|' + score;
      });

      console.log(cards);

      slider.addEventListener('change', function () {
          // let sliderValue = slider.value;
          // let cards =  card;
          // if (score > sliderValue) {
          //   console.log(cards);
          // } else {
          //    console.clear(cards);
          // }
      }, false);

      
      
      // function filterScore(sliderValue){
      //   if (score > sliderValue) {  
      //     console.log(card);
      //   }
      // } 
        

      
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();