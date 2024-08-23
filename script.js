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

// Book constructor function
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Initialize library with dummy data
const myLibrary = [
    new Book("Harry Potter Series by J.K. Rowling", "J.K Rowling", 300, false),
    new Book("The Lord of the Rings", "J.R.R. Tolkien", 677, true)
];

// Display books in the container
function displayBooks() {
    const container = document.getElementById("container");
    container.innerHTML = '';

    myLibrary.forEach(book => {
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
            const index = myLibrary.indexOf(book);
            if (index > -1) {
                myLibrary.splice(index, 1);
                displayBooks();
            }
        };
        cardContent.appendChild(removeBtn);

        card.appendChild(cardContent);
        container.appendChild(card);
    });
}

// Handle form submission
document.getElementById("bookForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value, 10);
    const isRead = document.getElementById("read").checked;

    myLibrary.push(new Book(title, author, pages, isRead));

    document.getElementById("bookForm").reset();
    modal.style.display = "none";
    displayBooks();
});

// Initial display of books
displayBooks();
