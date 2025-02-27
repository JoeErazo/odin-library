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

const addBookButton = document.querySelector(".add-book");
const modal = document.querySelector("#modal");
const formTitle = document.querySelector("#title");
const formAuthor = document.querySelector("#author");
const formPageCount = document.querySelector("#page-count");
const formRead = document.querySelector("#is-read");
const formAdd = document.querySelector("#add");
const formCancel = document.querySelector("#cancel");
const cardContainer = document.querySelector(".card-container");
const removeButton = document.querySelectorAll(".remove-card");
const toggleRead = document.querySelectorAll(".toggle-read");

function enableRemoveButton(button) {
  button.addEventListener("click", function() {
    button.closest("div.card").remove();
  });
}

function enableToggleRead(button) {
  button.addEventListener("click", function() {
    const readContainer = button
                            .closest("div.card")
                            .querySelector("p.read");
    readContainer.textContent =
      readContainer.textContent === "Read" ? "Not Read" : "Read";
    button.textContent = button.textContent === "🗸" ? "᠆" : "🗸";
  });
}

addBookButton.addEventListener("click", function() {
  modal.showModal();
  modal.returnValue = ""; // prevent unexpected addition of card
  // reset form input values
  formTitle.value = null;
  formAuthor.value = null;
  formPageCount.value = "";
  formRead.checked = false;
});

formCancel.addEventListener("click", function(e) {
  e.preventDefault();
  modal.close();
});

modal.addEventListener("close", function() {
  // check validity of form submission before adding card
  // success: returnValue = "add"; failed: returnValue = ""
  if(modal.returnValue === "add") {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    const newRemoveButton = document.createElement("button");
    newRemoveButton.classList.add("remove-card");
    newRemoveButton.textContent = "☓";
    enableRemoveButton(newRemoveButton);
    newCard.innerHTML = `
      <div class="book-cover"></div>
      <div class="book-details">
        <h2 class="book-title">${formTitle.value}</h2>
        <h3 class="author">${formAuthor.value}</h3>
        <p class="page-count">${formPageCount.value}</p>
        <p class="read">${formRead.checked ? "Read" : "Not Read"}</p>
      </div>
    `;
    const newToggleRead = document.createElement("button");
    newToggleRead.classList.add("toggle-read");
    newToggleRead.textContent = formRead.checked ? "🗸" : "᠆";
    enableToggleRead(newToggleRead);
    
    newCard.prepend(newRemoveButton);
    newCard.appendChild(newToggleRead);
    cardContainer.appendChild(newCard);
  }
});

modal.addEventListener("keydown", function(e) {
  if(e.key==="Enter"){
    e.preventDefault();
    modal.returnValue = "add";
    modal.close();
  }
});

// enable remove button functionality on existing cards
removeButton.forEach((button) => enableRemoveButton(button));
toggleRead.forEach((button) => enableToggleRead(button));