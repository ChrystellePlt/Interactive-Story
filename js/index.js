const updateContent = (index, data, iterator) => {

  const choicesCtn = document.querySelector('.bookContainer__pageContainer__buttonsContainer');
  const choices = document.querySelectorAll('.choices');
  const choice01 = document.querySelector('.choice_01');
  const choice02 = document.querySelector('.choice_02');
  const nextBtn = document.querySelector('.next_button');
  const prevBtn = document.querySelector('.prev_button');
  const content = document.querySelector('.bookContainer__pageContainer__textContent');
  const date = document.querySelector('.bookContainer__pageContainer__date');


  index = iterator(index);
  changeRightPage(data, index);
  updateBackground(index, data.data[index].background);

  if (index === 3) {
    nextBtn.classList.add('--hidden');
    prevBtn.classList.add('--hidden');
    choicesCtn.classList.remove('--hidden');
  } else if (index === 8) {
    nextBtn.classList.add('--hidden');
    prevBtn.classList.add('--hidden');
    choicesCtn.classList.remove('--hidden');
    content.innerHTML = data.data[index].text;
    date.innerHTML = data.data[index].date;
    choice01.innerHTML = data.data[index].choices[0].choice;
    choice02.innerHTML = data.data[index].choices[1].choice;
  }
  return index;
}

const updateContentBis = (index, data) => {

  const choices = document.querySelectorAll('.choices');
  const choice01 = document.querySelector('.choice_01');
  const choice02 = document.querySelector('.choice_02');

  changeRightPage(data, index);
  updateBackground(index, data.data[index].background);
  choice01.innerHTML = data.data[index].choices[0].choice;
  choice02.innerHTML = data.data[index].choices[1].choice;
  switch (data.data[index].animationType) {
    case 2:
      showButtons();
      break;
    case 3:
      choice02.classList.add('--hidden');
      break;
    default:
      hideButtons();
  }
  return index;
}

const changeRightPage = (data, index) => {

  const date = document.querySelector('.bookContainer__pageContainer__date');
  const content = document.querySelector('.bookContainer__pageContainer__textContent');
  const leftPage = document.querySelector('.bookContainer__leftPage');

  date.innerHTML = data.data[index].date;
  content.innerHTML = data.data[index].text;
  leftPage.innerHTML = `<img class="bookContainer__leftPage__img" src=${data.data[index].leftPage} alt="">`;
}

const updateBackground = (index, background) => {

  let curr;

  curr = document.querySelector(background);

  if (index > 1) {
    if (curr !== prev) {
      curr.classList.add('--show');
      prev.classList.remove('--show');
    }
  }
  prev = curr;
}

const showButtons = () => {

  const choicesCtn = document.querySelector('.bookContainer__pageContainer__buttonsContainer');
  const nextBtn = document.querySelector('.next_button');
  const prevBtn = document.querySelector('.prev_button');

  choicesCtn.classList.add('--hidden');
  nextBtn.classList.remove('--hidden');
  prevBtn.classList.remove('--hidden');
}

const hideButtons = () => {

  const choicesCtn = document.querySelector('.bookContainer__pageContainer__buttonsContainer');
  const nextBtn = document.querySelector('.next_button');
  const prevBtn = document.querySelector('.prev_button');
  const choice02 = document.querySelector('.choice_02');

  choicesCtn.classList.remove('--hidden');
  nextBtn.classList.add('--hidden');
  prevBtn.classList.add('--hidden');
  if (choice02.classList.contains('--hidden')) {
    choice02.classList.remove('--hidden');
  }
}


fetch('./js/data.json')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {

        const choices = document.querySelectorAll('.choices');
        let index = 0;

        const nextBtn = document.querySelector('.next_button');
        const prevBtn = document.querySelector('.prev_button');

        coverPageAnimation();

        nextBtn.addEventListener('click', (event) => {
          index = updateContent(index, data, function(a) {
            return new Number(a) + 1;
          });
        })

        prevBtn.addEventListener('click', (event) => {
          index = updateContent(index, data, function(a) {
            return new Number(a) - 1;
          });
        })

        for (let i = 0; i < choices.length; i++) {
          choices[i].addEventListener("click", function() {
            index = data.data[index].choices[i].next;
            updateContentBis(index, data)
          })
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

const coverPageAnimation = () => {

  const name = document.querySelector('#charlie_path');
  const startBtn = document.querySelector('.bookContainer__coverPage__button');
  const coverPage = document.querySelector('.bookContainer__coverPage');
  const pagesContainer = document.querySelector('.bookContainer__pageContainer');
  const nextBtn = document.querySelector('.next_button');
  const prevBtn = document.querySelector('.prev_button');
  const leftPage = document.querySelector('.bookContainer__leftPage');


  name.addEventListener('animationend', () => {
    startBtn.classList.remove('--hidden');
    startBtn.classList.add('--nameAnimations');
  })

  startBtn.addEventListener('click', () => {
    coverPage.classList.add('--fadeOut');
    coverPage.addEventListener('animationend', () => {
      coverPage.classList.add('--hidden');
      pagesContainer.classList.remove('--hidden');
      pagesContainer.classList.add('--fadeIn');
      pagesContainer.addEventListener('animationend', () => {
        nextBtn.classList.remove('--hidden');
        nextBtn.classList.add('--fadeIn');
        prevBtn.classList.remove('--hidden');
        prevBtn.classList.add('--fadeIn');
      })
    })
  })
}
