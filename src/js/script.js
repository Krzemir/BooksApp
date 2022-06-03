{
  'use strict';
  
  const booksData = dataSource.books;

  const dom = {
    booksContainer: document.querySelector('.books-list'),
   
  };
  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };

  const favoriteBooks = [];
  
  
  
  function render(){
    const thisBook = this;
    // console.log(thisBook);
    for(const bookId of booksData){
      //console.log(bookId);
  
      const generatedHTML = templates.bookList(bookId);
  
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      dom.booksContainer.appendChild(thisBook.element);
    }
  
  }
  render();

  function initActions(){
    const covers = dom.booksContainer.querySelectorAll('.book__image');

    for (const cover of covers){
      //console.log(cover);
      const bookId = cover.getAttribute('data-id');
      //console.log(bookId);

      cover.addEventListener('click', function (event) {
        event.preventDefault();

        if(!favoriteBooks.bookId && !cover.classList.contains('favorite')){

          favoriteBooks.push(bookId);
          // console.log(favoriteBooks);
          cover.classList.add('favorite');
        } else {
          // console.log('unclicked');
          const toRemove = favoriteBooks.indexOf(bookId);
          //console.log(toRemove);
          favoriteBooks.splice(toRemove, 1);
          cover.classList.remove('favorite');
        }
        console.log('left', favoriteBooks);
      });
    }
  
  }
  initActions();
}