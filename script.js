const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
              this.read ? "already read" : "not yet read"}`;
  };
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {

}

addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 336, false);
addBookToLibrary("The Alchemist", "Paulo Coelho", 208, true);
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 288, false);
addBookToLibrary("Mrs. Frisby and the Rats of NIMH", "Robert C. O'Brien", 233, true);

const modal = document.querySelector("#modal");
const addBookButton = document.querySelector(".add-book");
const formAdd = document.querySelector("#add");
const formCancel = document.querySelector("#cancel");

addBookButton.addEventListener("click", function() {
  modal.showModal();
});

formCancel.addEventListener("click", function(e) {
  e.preventDefault();
  modal.close();
});