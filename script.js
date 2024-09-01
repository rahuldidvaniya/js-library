// Get modal and button elements
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// Event listeners for modal actions
openModalBtn.onclick = () => modal.style.display = "block";
closeModalBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Book class
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

// Library class to manage the book collection
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
        }
    }

    getBooks() {
        return this.books;
    }
}

// Books class to handle DOM interactions
class Books {
    constructor(library) {
        this.library = library;
    }

    displayBooks() {
        const container = document.getElementById("container");
        container.innerHTML = '';

        this.library.getBooks().forEach(book => {
            const card = document.createElement("div");
            card.classList.add("card");

            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            const title = document.createElement("h3");
            title.classList.add("book-title");
            title.textContent = book.title;
            cardContent.appendChild(title);

            const author = document.createElement("p");
            author.classList.add("author");
            author.textContent = `Author: ${book.author}`;
            cardContent.appendChild(author);

            const pages = document.createElement("p");
            pages.classList.add("pages");
            pages.textContent = `${book.pages} pages`;
            cardContent.appendChild(pages);

            const toggleReadBtn = document.createElement("button");
            toggleReadBtn.classList.add("toggle-read");
            toggleReadBtn.textContent = book.isRead ? "Read" : "Not Read";
            toggleReadBtn.style.backgroundColor = book.isRead ? '#4CAF50' : 'var(--color-header)';
            toggleReadBtn.onclick = () => {
                book.isRead = !book.isRead;
                toggleReadBtn.textContent = book.isRead ? "Read" : "Not Read";
                toggleReadBtn.style.backgroundColor = book.isRead ? '#4CAF50' : 'var(--color-header)';
            };
            cardContent.appendChild(toggleReadBtn);

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-btn");
            removeBtn.textContent = "Remove";
            removeBtn.onclick = () => {
                this.library.removeBook(book);
                this.displayBooks();
            };
            cardContent.appendChild(removeBtn);

            card.appendChild(cardContent);
            container.appendChild(card);
        });
    }
}

// Initialize library with dummy data
const myLibrary = new Library();
myLibrary.addBook(new Book("Harry Potter Series by J.K. Rowling", "J.K Rowling", 300, false));
myLibrary.addBook(new Book("The Lord of the Rings", "J.R.R. Tolkien", 677, true));

const BookManager = new Books(myLibrary);

// Handle form submission
document.getElementById("bookForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value, 10);
    const isRead = document.getElementById("read").checked;

    myLibrary.addBook(new Book(title, author, pages, isRead));

    document.getElementById("bookForm").reset();
    modal.style.display = "none";
    BookManager.displayBooks();
});

// Initial display of books
BookManager.displayBooks();
