const bookFormModal = document.querySelector("dialog");
const showBookFormModalButton = document.querySelector("#dialog-btn");
const closeBookFormModalButton = document.querySelector(".cancel");
const books = document.querySelector(".books");
const bookForm = document.querySelector("dialog form");

class Library {
  constructor() {
    this.shelf = [];
  }

  getBooks() {    
    return this.shelf;
  }

  addBook(book) {
    this.shelf.push(book);
  }

  deleteBook(bookId){
    this.shelf = this.shelf.filter((book) => book.id !== bookId);
  }
}

const library = new Library();

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    const lastBookInLibraryShelf = library.getBooks()[library.getBooks().length - 1]
    this.id = lastBookInLibraryShelf ? lastBookInLibraryShelf.id + 1 : 1;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.status === "unread" ? "not read yet" : "has been read"
    } `;
  }

  updateStatus(status) {
    this.status = status;
  }
}



const book1 = new Book("The Alchemist", "Paulo Coelho", 445, "unread");

library.addBook(book1);
const book2 = new Book(
  "How to fail at almost anything and still win big",
  "Scot Adams",
  449,
  "read"
);
library.addBook(book2);

const book3 = new Book("The way of men", "Jack Donovan", "356", "unread");
library.addBook(book3);

const book4 = new Book("The Ambler Warning", "Robert Ludlum", 449, "unread");
library.addBook(book4);

function getBookInputs() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = [
    ...document
      .querySelector("#status")
      .querySelectorAll('input[type="radio"]'),
  ].find((el) => el.checked);
  return {
    title,
    author,
    pages,
    status: status ? status.id.toLowerCase() : "unread",
  };
}

function toggleBookStatus(bookId) {
  const book = library.getBooks().find((book) => book.id === bookId);
  book.updateStatus(book.status === "read" ? "unread" : "read");
  displayBooks();
}

function deleteBookFromLibrary(bookId) {
 library.deleteBook(bookId)
  displayBooks();
}

function addBookToLibrary(e) {
  e.preventDefault();
  const newBook = getBookInputs();
  if (!newBook.title || !newBook.author || !newBook.pages || !newBook.status)
    return;
  const book = new Book(
    newBook.title,
    newBook.author,
    newBook.pages,
    newBook.status
  );
  library.addBook(book);
  bookForm.reset();
  bookFormModal.close();
  displayBooks();
}

function createBookUiItem(book) {
  const li = document.createElement("li");
  li.classList.add("book");
  li.setAttribute("data-id", book.id);
  const h3 = document.createElement("h3");
  h3.textContent = book.title;
  const author = document.createElement("p");
  author.textContent = book.author;
  const pages = document.createElement("p");
  pages.textContent = book.pages;
  const statusBtn = document.createElement("button");
  statusBtn.textContent = book.status;
  statusBtn.classList += `status-btn ${book.status}`;
  statusBtn.addEventListener("click", () => toggleBookStatus(book.id));
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => deleteBookFromLibrary(book.id));
  li.append(h3, author, pages, statusBtn, deleteBtn);
  return li;
}

function displayBooks() {
  books.innerHTML = "";
  const booklist = library.getBooks().map((book) => {
    return createBookUiItem(book);
  });
  books.append(...booklist);
}

displayBooks();

showBookFormModalButton.addEventListener("click", () => {
  bookFormModal.showModal();
});

closeBookFormModalButton.addEventListener("click", () => {
  bookFormModal.close();
});

bookForm.addEventListener("submit", addBookToLibrary);
