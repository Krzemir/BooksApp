{
  'use strict';
  const log = console.log;
  const booksData = dataSource.books;
  const favoriteBooks = [];
  const filters = [];

  const dom = {
    booksContainer: document.querySelector('.books-list'),
    filterForm: document.querySelector('.filters'),
  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };

  function render(){
    const thisBook = this;

    for(const bookId of booksData){
      const rating = bookId.rating;
      const ratingWidth = rating*10;
      const ratingBgc = determineRatingBgc(rating);
      bookId.ratingWidth = ratingWidth;
      bookId.ratingBgc = ratingBgc;

      const generatedHTML = templates.bookList(bookId);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      dom.booksContainer.appendChild(thisBook.element);
    }
  }
  render();

  function initActions(){
    const covers = dom.booksContainer;

    covers.addEventListener('click', function (event) {
      event.preventDefault();
      const clickedBook = event.target;

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

    dom.filterForm.addEventListener('dblclick', function (event) {
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
      }
      const bookForHidden = dom.booksContainer.querySelector('.book__image' + '[data-id="' + book.id + '"]');

      if (forHidden == true){
        bookForHidden.classList.add('hidden');
      } else {
        bookForHidden.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating){

    let ratingBgc = '';
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

  }

  initActions();
}