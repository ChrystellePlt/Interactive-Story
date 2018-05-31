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
        const background = document.querySelector('.backgroundContainer');
        let index = 0;

        nextBtn.addEventListener('click', (event) => {
          index++
          date.innerHTML = data.data[index].date;
          content.innerHTML = data.data[index].text;
          background.innerHTML = data.data[index].background;
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
        } )

        prevBtn.addEventListener('click', (event) => {
          index--
          content.innerHTML = data.data[index].text;
        } )



        for (let i = 0; i < choices.length; i++) {
          choices[i].addEventListener("click", function() {
            index = data.data[index].choices[i].next;
            console.log(data.data[index].choices[i].next);
            content.innerHTML = data.data[index].text;
            date.innerHTML = data.data[index].date;
            choice01.innerHTML = data.data[index].choices[0].choice;
            choice02.innerHTML = data.data[index].choices[1].choice;
            console.log(data.data[index].index);
            if (data.data[index].index === 7 ) {
              nextBtn.classList.remove('--hidden');
              prevBtn.classList.remove('--hidden');
              choicesCtn.classList.add('--hidden');
            } else if ((data.data[index].index === 9) || (data.data[index].index === 10) || (data.data[index].index === 11) || (data.data[index].index === 12)) {
              choicesCtn.classList.add('--hidden');
            } else {
              nextBtn.classList.add('--hidden');
              prevBtn.classList.add('--hidden');
              choicesCtn.classList.remove('--hidden');
            }
          })
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

  const name = document.querySelector('#charlie_path');
  const startBtn = document.querySelector('.bookContainer__coverPage__button');
  const coverPage = document.querySelector('.bookContainer__coverPage');
  const pagesContainer = document.querySelector('.bookContainer__pageContainer');


  name.addEventListener('animationend', () => {
    startBtn.classList.remove('--hidden');
    startBtn.classList.add('--animations');
  })

  startBtn.addEventListener('click', () => {
    coverPage.classList.add('--hidden');
    pagesContainer.classList.remove('--hidden');
  })
