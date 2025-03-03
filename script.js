(function() {
  const myLibrary = [];
  const addBookButton = document.querySelector(".add-book");
  const modal = document.querySelector("#modal");
  const formTitle = document.querySelector("#title");
  const formAuthor = document.querySelector("#author");
  const formPageCount = document.querySelector("#page-count");
  const formRead = document.querySelector("#is-read");
  const formAdd = document.querySelector("#add");
  const formCancel = document.querySelector("#cancel");
  const cardContainer = document.querySelector(".card-container");

  class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }

    get info() {
      return `${this.title} by ${this.author}, ${this.pages} pages, ${
        this.read ? "already read" : "not yet read"}`;
    }
  }

  function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
  }

  function displayBooks() {
    let cardsHTML = "";
    myLibrary.forEach((book) => {
      cardsHTML += `
        <div class="card" data-index-number="${myLibrary.indexOf(book)}">
          <button class="toggle-read">${book.read ? "🗸" : "᠆"}</button>
          <button class="remove-card">☓</button>
          <div class="book-cover"></div>
          <div class="book-details">
            <h2 class="book-title">${book.title}</h2>
            <h3 class="author">${book.author}</h3>
            <p class="page-count">${book.pages} pages</p>
            <p class="read">${book.read ? "Read" : "Not Read"}</p>
          </div>
        </div>
      `;
    });
    cardContainer.innerHTML = cardsHTML;

    // enable remove button functionality on existing cards
    document.querySelectorAll(".remove-card").forEach((button) => enableRemoveButton(button));
    document.querySelectorAll(".toggle-read").forEach((button) => enableToggleRead(button));
  }

  function enableRemoveButton(button) {
    button.addEventListener("click", function() {
      // remove corresponding book object from myLibrary array
      myLibrary.splice(button.closest("div.card").dataset.indexNumber, 1);
      displayBooks();
    });
  }

  function enableToggleRead(button) {
    button.addEventListener("click", function() {
      const cardDiv = button.closest("div.card");
      // toggle read status on Book object referenced in card
      myLibrary[cardDiv.dataset.indexNumber].read = !myLibrary[cardDiv.dataset.indexNumber].read;
      displayBooks();
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
      addBookToLibrary(formTitle.value, formAuthor.value, formPageCount.value, formRead.checked);
      displayBooks();
    }
  });

  modal.addEventListener("keydown", function(e) {
    if(e.key==="Enter"){
      e.preventDefault();
      formAdd.click();
    }
  });

  // initialize myLibrary with default content
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 336, false);
  addBookToLibrary("The Alchemist", "Paulo Coelho", 208, true);
  addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 288, false);
  addBookToLibrary("Mrs. Frisby and the Rats of NIMH", "Robert C. O'Brien", 233, true);

  displayBooks();
})();