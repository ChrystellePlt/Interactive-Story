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
        const bg01 = document.querySelector('.bg01');
        const bg02 = document.querySelector('.bg02');
        const bg03 = document.querySelector('.bg03');

        let index = 0;

        nextBtn.addEventListener('click', (event) => {
            index++
            date.innerHTML = data.data[index].date;
            content.innerHTML = data.data[index].text;
            switch (data.data[index].background) {
              case 1 : bgContainer.innerHTML = `<img class="backgroundContainer__img" src="img/background01.jpg" alt="">`;
              break;
              case 2 : bgContainer.innerHTML = `<img class="backgroundContainer__img" src="img/background02.jpg" alt="">`;
              break;
              case 3 :bgContainer.innerHTML = `<img class="backgroundContainer__img" src="img/background03.jpg" alt="">`;
              break;
            }
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

        prevBtn.addEventListener('click', (event) => {
          index--
          content.innerHTML = data.data[index].text;
        } )

        for (let i = 0; i < choices.length; i++) {
          choices[i].addEventListener("click", function() {
            index = data.data[index].choices[i].next;
            date.innerHTML = data.data[index].date;
            content.innerHTML = data.data[index].text;
            switch (data.data[index].background) {
              case 1 : bgContainer.innerHTML = `<img class="backgroundContainer__img" src="img/background01.jpg" alt="">`;
              break;
              case 2 : bgContainer.innerHTML = `<img class="backgroundContainer__img" src="img/background02.jpg" alt="">`;
              break;
              case 3 :bgContainer.innerHTML = `<img class="backgroundContainer__img" src="img/background03.jpg" alt="">`;
              break;
            }
            choice01.innerHTML = data.data[index].choices[0].choice;
            choice02.innerHTML = data.data[index].choices[1].choice;
            if (data.data[index].animationType === 2 ) {
              nextBtn.classList.remove('--hidden');
              prevBtn.classList.remove('--hidden');
              choicesCtn.classList.add('--hidden');
            } else if (data.data[index].animationType === 3) {
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

  //cover page cascading animation

  const name = document.querySelector('#charlie_path');
  const startBtn = document.querySelector('.bookContainer__coverPage__button');
  const coverPage = document.querySelector('.bookContainer__coverPage');
  const pagesContainer = document.querySelector('.bookContainer__pageContainer');
  const nextBtn = document.querySelector('.next_button');
  const prevBtn = document.querySelector('.prev_button');


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
