const myLibrary = [];

// Constructor function for Book
function Book(title, author, pages, recommend, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.recommend = recommend;
  this.read = read;
}

// Add a method to the Book prototype to toggle the read status
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

// Function to add a new book to the library array
function addBookToLibrary(title, author, pages, recommend, read = false) {  
   const newBook = new Book(title, author, pages, recommend, read);
   myLibrary.push(newBook);
   displayBooks();
}

// Function to remove a book from the library
function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

// Function to display books on the page
function displayBooks() {
  const libraryContainer = document.getElementById("library-container");
  libraryContainer.innerHTML = ""; // Clear previous content

  myLibrary.forEach((book, index) => {
    // Create a card for each book
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Book details
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Recommend:</strong> ${book.recommend}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
    `;

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeBookFromLibrary(index));

    // Toggle read status button
    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    toggleReadBtn.addEventListener("click", () => {
      book.toggleReadStatus();
      displayBooks(); // Update the display after toggling read status
    });

    // Append buttons to the book card
    bookCard.appendChild(removeBtn);
    bookCard.appendChild(toggleReadBtn);

    // Append each book card to the container
    libraryContainer.appendChild(bookCard);
  });
}

// Dialog and form handling
const dialog = document.getElementById("book-dialog");
const openDialogBtn = document.getElementById("open-dialog");
const closeDialogBtn = document.getElementById("close-dialog");

// Open dialog
openDialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

// Close dialog
closeDialogBtn.addEventListener("click", () => {
  dialog.close();
});

// Form submission handler
const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form from submitting traditionally

  // Get input values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const recommend = document.getElementById("recommend").value;
  const read = document.getElementById("read-status").checked;

  // Add book to library and update display
  addBookToLibrary(title, author, pages, recommend, read);

  // Reset form and close dialog
  bookForm.reset();
  dialog.close();
});
