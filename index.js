const bookFormModal = document.querySelector("dialog");
const showBookFormModalButton = document.querySelector("#dialog-btn");
const closeBookFormModalButton = document.querySelector(".cancel");
const books = document.querySelector(".books");
const bookForm = document.querySelector("dialog form");

const myLibrary = [];

function Book(title, author, pages, status) {
  this.id = myLibrary.length + 1;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.isRead ? "not read yet" : "has been read"
  } `;
};

const book1 = new Book("The Alchemist", "Paulo Coelho", 445, "unread");
myLibrary.push(book1);
const book2 = new Book(
  "How to fail at almost anything and still win big",
  "Scot Adams",
  449,
  "read"
);
myLibrary.push(book2);
const book3 = new Book("The way of men", "Jack Donovan", "356", "unread");
myLibrary.push(book3);
const book4 = new Book("The Ambler Warning", "Robert Ludlum", 449, "unread");
myLibrary.push(book4);

function getBookInputs() {
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = [
    ...document
      .querySelector("#status")
      .querySelectorAll('input[type="radio"]'),
  ]
    .find((el) => el.checked)
    .id.toLowerCase();
  return {
    title,
    author,
    pages,
    status,
  };
}

function addBookToLibrary(e) {
  e.preventDefault();
  const newBook = getBookInputs();
  const book = new Book(
    newBook.title,
    newBook.author,
    newBook.pages,
    newBook.status
  );
  myLibrary.push(book);
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
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.classList.add("delete-btn");
  li.append(h3, author, pages, statusBtn, deleteBtn);
  return li;
}

function displayBooks() {
  books.innerHTML = "";
  const booklist = myLibrary.map((book) => {
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
