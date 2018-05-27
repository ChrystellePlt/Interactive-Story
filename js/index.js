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
        const content = document.querySelector('.bookContainer__pageContainer__textContent');
        const choices = document.querySelectorAll('.choices');
        const choice01 = document.querySelector('.choice_01');
        const choice02 = document.querySelector('.choice_02');
        const nextBtn = document.querySelector('.next_button');
        const prevBtn = document.querySelector('.prev_button');
        let index = 0;

        nextBtn.addEventListener('click', (event) => {
          index++
          content.innerHTML = data.data[index].text;
          console.log(index);
          if (index > 4) {
            nextBtn.classList.add('--hidden');
            prevBtn.classList.add('--hidden');
            choice01.classList.remove('--hidden');
            choice02.classList.remove('--hidden');
          }
        } )

        prevBtn.addEventListener('click', (event) => {
          index--
          content.innerHTML = data.data[index].text;
        } )



        for (let i = 0; i < choices.length; i++) {
          choices[i].addEventListener("click", function() {
            index = data.data[index].choices[i].next;
            content.innerHTML = data.data[index].text;
            choice01.innerHTML = data.data[index].choices[0].button;
            choice02.innerHTML = data.data[index].choices[1].button;
          })
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
