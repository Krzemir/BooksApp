{
  'use strict';

  const favoriteBooks = [];
  const filters = [];

  const dom = {
    booksContainer: document.querySelector('.books-list'),
    filterForm: document.querySelector('.filters'),
  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };

  class BooksList {
    constructor (){
      const thisBook = this;
      thisBook.initData();
      //thisBook.getElements();
      thisBook.render();
      thisBook.initActions();
      thisBook.filter();
      thisBook.determineRatingBgc();

    }

    initData(){
      this.data = dataSource.books;
    }

    // getElements(){

    // }

    render(){
      const thisBook = this;

      for(const book of thisBook.data){

        const rating = book.rating;
        const ratingWidth = rating*10;
        const ratingBgc = thisBook.determineRatingBgc(rating);
        book.ratingWidth = ratingWidth;
        book.ratingBgc = ratingBgc;

        const generatedHTML = templates.bookList(book);
        thisBook.element = utils.createDOMFromHTML(generatedHTML);
        dom.booksContainer.appendChild(thisBook.element);
      }
    }

    initActions(){

      dom.booksContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const clickedBook = event.target;

        if(clickedBook.offsetParent.classList.contains('book__image')){
          const book = clickedBook.offsetParent.getAttribute('data-id');
          if(!favoriteBooks.book && !clickedBook.offsetParent.classList.contains('favorite')){
            favoriteBooks.push(book);
            clickedBook.offsetParent.classList.add('favorite');
          } else {
            const toRemove = favoriteBooks.indexOf(book);
            favoriteBooks.splice(toRemove, 1);
            clickedBook.offsetParent.classList.remove('favorite');
          }
        }
      });

      dom.filterForm.addEventListener('dblclick', function (event) {
        if(event.target.tagName =='INPUT'  && event.target.type == 'checkbox' && event.target.name == 'filter') {
          if (event.target.checked) {
            filters.push(event.target.value);
          }
          else{
            filters.splice(filters.indexOf(event.target.value, 1));
          }
        }

        this.filter();
      });
    }

    filter (){
      const thisBook = this;
      for (const book of thisBook.data){
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

    determineRatingBgc(rating){

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

  }
  const app = new BooksList();
  app();
}