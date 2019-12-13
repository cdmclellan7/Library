let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return title + ' by ' + author + ', ' + pages + ' pages.';
    }
}

function addBookToLibrary(title, author, pages, read) {
    title = title || document.getElementById("title").value;
    author = author || document.getElementById("author").value;
    pages = pages || document.getElementById("pages").value;
    read = read || getRead();
    book = new Book(title, author, pages, read);
    myLibrary.push(book);
    renderBook(book);
}

function getRead() {
    const readRadios = document.getElementsByName("read");
    return readRadios[0].checked;
}

function deleteBook(infoToDelete) {
    myLibrary = myLibrary.filter( (x) => {
        return x.info() != infoToDelete;
    });

    const queryString = 'div[data-info="'+ infoToDelete +'"]';
    const card = document.querySelector(queryString);
    container.removeChild(card);
}

function toggleRead(infoToToggle) {
    const queryString = 'p[data-info="'+ infoToToggle +'"]';
    const readDiv = document.querySelector(queryString);
    let book;
    for (let i=0; i<myLibrary.length; i++) {
        if (infoToToggle == myLibrary[i].info()) {
            book = myLibrary[i];
            break;
        }
    }
    book.read = !book.read;
    readDiv.textContent = book.read ? "Already read" : "Not yet read";
}

const container = document.querySelector('#container');

function renderBook(book) {
    const info = book.info();

    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = book.info();
    card.setAttribute('data-info', info);
    container.appendChild(card);

    const readDiv = document.createElement('p');
    readDiv.textContent = book.read ? "Already read" : "Not yet read";
    readDiv.setAttribute('data-info', info);
    card.appendChild(readDiv);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = "Delete Book";
    deleteBtn.setAttribute('data-info', info);
    deleteBtn.setAttribute('onclick', 'deleteBook(this.dataset.info)');
    card.appendChild(deleteBtn);

    const readBtn = document.createElement('button');
    readBtn.textContent = "Change Read Status";
    readBtn.setAttribute('data-info', info);
    readBtn.setAttribute('onclick', 'toggleRead(this.dataset.info)');
    card.appendChild(readBtn);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Test 1", "Author 1", 10, false);
addBookToLibrary("Test 2", "Author 2", 1048, true);
addBookToLibrary("Test 3", "Author 3", 1040349, false);