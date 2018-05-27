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
        const content = document.querySelector('.bookContainer__pageContainer__pageContent');
        const choices = document.querySelectorAll('.choices');
        const button01 = document.querySelector('.button01');
        const button02 = document.querySelector('.button02');
        let index = 0;

        for (let i = 0; i < choices.length; i++) {
          choices[i].addEventListener("click", function() {
            index = data.data[index].choices[i].next;
            content.innerHTML = data.data[index].text;
            button01.innerHTML = data.data[index].choices[0].button;
            button02.innerHTML = data.data[index].choices[1].button;
          })
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
