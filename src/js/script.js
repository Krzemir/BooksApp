{
  'use strict';
  
  const books = dataSource.books;
  const booksContainer = document.querySelector('.books-list');
  
  const templates = {
    bookList: Handlebars.compile(document.querySelector('#template-book').innerHTML)
  };
  
  
  
  function render(){
    const thisBook = this;
    // console.log(thisBook);
    for(const bookId of books){
      //console.log(bookId);
  
      const generatedHTML = templates.bookList(bookId);
  
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      booksContainer.appendChild(thisBook.element);
    }
  
  }
  render();
}
  