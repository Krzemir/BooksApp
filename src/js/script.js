{
  'use strict';
  const log = console.log;
  const booksData = dataSource.books;

  const dom = {
    booksContainer: document.querySelector('.books-list'),
    filterForm: document.querySelector('.filters')
   
  };

  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };

  const favoriteBooks = [];
  const filters = [];
  
  
  
  function render(){
    const thisBook = this;

    for(const bookId of booksData){

  
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
      log(filters);
    });
  }

  initActions();
}