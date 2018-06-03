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
        const date = document.querySelector('.bookContainer__pageContainer__date');
        const content = document.querySelector('.bookContainer__pageContainer__textContent');
        const choicesCtn = document.querySelector('.bookContainer__pageContainer__buttonsContainer');
        const choices = document.querySelectorAll('.choices');
        const choice01 = document.querySelector('.choice_01');
        const choice02 = document.querySelector('.choice_02');
        const nextBtn = document.querySelector('.next_button');
        const prevBtn = document.querySelector('.prev_button');
        const bgContainer = document.querySelector('.backgroundContainer');
        const leftPage = document.querySelector('.bookContainer__leftPage');
        let index = 0;
        let curr;
        let prev = document.querySelector('.--bg01');

        const updateBackground = () => {
          curr = document.querySelector(data.data[index].background);
          if (curr !== prev) {
            curr.classList.add('--show');
            prev.classList.remove('--show');
          }
          prev = curr;
        }

        const changeRightPage = () => {
          date.innerHTML = data.data[index].date;
          content.innerHTML = data.data[index].text;
          leftPage.innerHTML = `<img class="bookContainer__leftPage__img" src=${data.data[index].leftPage} alt="">`;
        }

        const updateContent = (trigger, iterator) => {

          trigger.addEventListener('click', (event) => {
              index = iterator(index);
              changeRightPage();
              updateBackground();
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
          })
        }

        const showButtons = () => {
          choicesCtn.classList.add('--hidden');
          nextBtn.classList.remove('--hidden');
          prevBtn.classList.remove('--hidden');
        }

        const hideButtons = () => {
          choicesCtn.classList.remove('--hidden');
          nextBtn.classList.add('--hidden');
          prevBtn.classList.add('--hidden');
          if (choice02.classList.contains('--hidden')) {
            choice02.classList.remove('--hidden');
          }
        }

        coverPageAnimation();

        updateContent(nextBtn, function(a) {return a + 1; });

        updateContent(prevBtn, function(a) {return a - 1; });

        for (let i = 0; i < choices.length; i++) {
          choices[i].addEventListener("click", function() {
            index = data.data[index].choices[i].next;
            changeRightPage();
            updateBackground();
            choice01.innerHTML = data.data[index].choices[0].choice;
            choice02.innerHTML = data.data[index].choices[1].choice;
            switch (data.data[index].animationType) {
              case 2 : showButtons();
            break;
              case 3 : choice02.classList.add('--hidden');
            break;
             default : hideButtons();
            }
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
