{
  'use strict';
  const log = console.log;
  const booksData = dataSource.books;

  const dom = {
    booksContainer: document.querySelector('.books-list'),
    filterForm: document.querySelector('.filters'),
    
   
  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };
  // - To ask:
  //   const ratingGradient = {
  //     rat1: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
  //     rat2: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)',
  //     rat3: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)',
  //     rat4: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)'
  //   };

  

  const favoriteBooks = [];
  const filters = [];
  
  
  
  function render(){
    const thisBook = this;

    for(const bookId of booksData){

  
      const generatedHTML = templates.bookList(bookId);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      dom.booksContainer.appendChild(thisBook.element);

      const ratingBar = thisBook.element.querySelector('.book__rating__fill');

      const rating = ratingBar.innerText.slice(0, ratingBar.innerText.length-3);

      const ratingWidth = rating*10;
      log('this', ratingWidth);

      const ratingBcg = determineRatingBgc(rating);
      log('this', ratingBcg);

      log('bar:', ratingBar);
      
      
      



      //   const ratingBar = thisBook.element.querySelector('.book__rating__fill');
      //   const ratingValue = ratingBar.innerText;

      //   const mainRatingValue = ratingValue.slice(0, ratingValue.length-3);
      //   log(mainRatingValue);
      //   const percentageValue = mainRatingValue*10;
      //   log(percentageValue);
      //   ratingBar.style.width = percentageValue + '%';

      //   if(mainRatingValue<6){
      //     ratingBar.style.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      //   } else if(mainRatingValue > 6 && mainRatingValue <= 8){
      //     ratingBar.style.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      //   } else if (mainRatingValue > 8 && mainRatingValue <= 9){
      //     ratingBar.style.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      //   } else if(mainRatingValue>9){
      //     ratingBar.style.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      //   }


    }
  
  }
  render();

  function initActions(){
    const covers = dom.booksContainer;

    covers.addEventListener('click', function (event) {
      event.preventDefault();
      const clickedBook = event.target;
      //log(clickedBook.offsetParent.classList.contains('book__image'));

      if(clickedBook.offsetParent.classList.contains('book__image')){

        const bookId = clickedBook.offsetParent.getAttribute('data-id');

        if(!favoriteBooks.bookId && !clickedBook.offsetParent.classList.contains('favorite')){

          favoriteBooks.push(bookId);

          clickedBook.offsetParent.classList.add('favorite');
        } else {

          const toRemove = favoriteBooks.indexOf(bookId);

          favoriteBooks.splice(toRemove, 1);
          clickedBook.offsetParent.classList.remove('favorite');
        }
      }
    });
    // log(dom.filterForm);
    dom.filterForm.addEventListener('click', function (event) {

      if(event.target.tagName =='INPUT'  && event.target.type == 'checkbox' && event.target.name == 'filter') {
        log(event.target.value, event.target.checked);
        if (event.target.checked) {
          filters.push(event.target.value);
        }
        else{
          log(filters.indexOf(event.target.value));
          filters.splice(filters.indexOf(event.target.value, 1));
        }
      }

      filter();
    });
  }
  

  function filter (){

    for (const book of booksData){
      let forHidden = false;
      for (const filter of filters){
        if (book.details[filter] == false){
          forHidden = true;
          break;
        }
        // log('book ID', book);
      }
      const bookForHidden = dom.booksContainer.querySelector('.book__image' + '[data-id="' + book.id + '"]');
      //log(bookForHidden);

      if (forHidden == true){
        bookForHidden.classList.add('hidden');
      } else {
        bookForHidden.classList.remove('hidden');
      }

    }
  }

  function determineRatingBgc(rating){

    let ratingBcg = '';
    if(rating<6){
      ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if(rating > 6 && rating <= 8){
      ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9){
      ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if(rating>9){
      ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return ratingBgc;

  };

  initActions();
}