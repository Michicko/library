const bookFormModal = document.querySelector("dialog");
const showBookFormModalButton = document.querySelector("#dialog-btn");
const closeBookFormModalButton = document.querySelector(".cancel");
const myLibrary = []

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;

  this.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'not read yet' : 'has been read'} `;
  }
}

function addBookToLibrary(){

}

function getBooks(){

}

function displayBooks(){
    
}

showBookFormModalButton.addEventListener("click", () => {
  bookFormModal.showModal();
});

closeBookFormModalButton.addEventListener("click", () => {
    bookFormModal.close();
});