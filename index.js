const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#dialog-btn");
const closeButton = document.querySelector("dialog button");
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



// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});