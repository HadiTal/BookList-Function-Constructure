//variable
const listBooks = JSON.parse(localStorage.getItem("infoBook"));



//selct element
const addBookBtn = document.querySelector(".btn");
const titleEl = document.getElementById("title");
const authorEl = document.getElementById("author");
const isbnEl = document.getElementById("isbn");
const headerTable = document.querySelector("thead");


//create Object
const html = new HTMLUI();

//eventListner
addBookBtn.addEventListener("click", addBook);
document.addEventListener("DOMContentLoaded", loadEvents);
headerTable.addEventListener("click", deleteBook);

//object

//==============================================

function HTMLUI() {}

function BookDetails(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//This checkFileds function validates the input fields for adding books.

HTMLUI.prototype.checkFileds = function(title, author, isbn) {
    let checkInput = false;

    const letter = /^[A-Za-z]+$/;

    if (title.length !== 0 && title.match(letter)) {
        titleEl.classList.add("valid");
        titleEl.classList.remove("invalid");
        checkInput = true;
    } else {
        titleEl.classList.remove("valid");
        titleEl.classList.add("invalid");
        checkInput = false;
    }

    if (author.length !== 0 && author.match(author)) {
        authorEl.classList.add("valid");
        authorEl.classList.remove("invalid");
        checkInput = true;
    } else {
        authorEl.classList.remove("valid");
        authorEl.classList.add("invalid");
        checkInput = false;
    }

    if (isbn.length !== 0 && Number(isbn)) {
        isbnEl.classList.add("valid");
        isbnEl.classList.remove("invalid");
        checkInput = true;
    } else {
        isbnEl.classList.remove("valid");
        isbnEl.classList.add("invalid");
        checkInput = false;
    }

    return checkInput;
};

//Create elements to display book specifications
HTMLUI.prototype.createElList = function(status) {
    if (status) {
        const thead = document.querySelector("thead");
        const trEl = document.createElement("tr");
        const tdTitle = document.createElement("th");
        const tdAuthor = document.createElement("th");
        const tdIsbn = document.createElement("th");
        const tdDelete = document.createElement("th");
        const iconDel = document.createElement("i");

        tdTitle.textContent = titleEl.value;
        tdAuthor.textContent = authorEl.value;
        tdIsbn.textContent = isbnEl.value;

        iconDel.classList.add("fa-solid", "fa-trash-can", "delete-icon");
        tdDelete.appendChild(iconDel);
        tdDelete.classList.add("center");
        tdTitle.classList.add("center");
        tdAuthor.classList.add("center");
        tdIsbn.classList.add("center");

        thead.appendChild(trEl);
        trEl.appendChild(tdTitle);
        trEl.appendChild(tdAuthor);
        trEl.appendChild(tdIsbn);
        trEl.appendChild(tdDelete);

        //Send book information values to constructure function SaveInf
        const saveInf = new BookDetails(
            titleEl.value,
            authorEl.value,
            isbnEl.value
        );


        //Call the save function in Local Storage
        saveInf.saveInfoLocal(saveInf);

        const message = document.querySelector(".message");
        message.classList.remove('diaplay-container-message');
        message.textContent = `book information was successfully recorded`;
        message.classList.add("correct-class");
        message.classList.remove("error-class");

        //Disappears the book registration message after 3 seconds
        setInterval(() => {

            message.classList.add('diaplay-container-message');
            titleEl.value = ''
            authorEl.value = ''
            isbnEl.value = '';

        }, 3000);


        //Return the elements to their previous state after registering a new book
        this.resetStyleELment();

    } else {
        const message = document.querySelector(".message");
        message.textContent = `Enter the book information correctly to register the book`;
        message.classList.remove("correct-class");
        message.classList.remove("diaplay-container-message");

        message.classList.add("error-class");

        //Disappearance of book registration error message after 3 seconds
        setInterval(() => {

            message.classList.add('diaplay-container-message');

        }, 3000);
    }
};

//Load elements to show a list of books
HTMLUI.prototype.showListDeatils = function() {
    if (Boolean(listBooks) !== false) {
        for (let i = 0; i < listBooks.length; i++) {
            const thead = document.querySelector("thead");
            const trEl = document.createElement("tr");
            const tdTitle = document.createElement("th");
            const tdAuthor = document.createElement("th");
            const tdIsbn = document.createElement("th");
            const tdDelete = document.createElement("th");
            const iconDel = document.createElement("i");

            tdTitle.textContent = listBooks[i].title;
            tdAuthor.textContent = listBooks[i].author;
            tdIsbn.textContent = listBooks[i].isbn;

            iconDel.classList.add("fa-solid", "fa-trash-can", "delete-icon");
            tdDelete.appendChild(iconDel);
            tdDelete.classList.add("center");
            tdTitle.classList.add("center");
            tdAuthor.classList.add("center");
            tdIsbn.classList.add("center");

            thead.appendChild(trEl);
            trEl.appendChild(tdTitle);
            trEl.appendChild(tdAuthor);
            trEl.appendChild(tdIsbn);
            trEl.appendChild(tdDelete);
        }
    }
};

//Return the elements to their previous state after registering a new book
HTMLUI.prototype.resetStyleELment = function() {

    titleEl.classList.remove('valid');
    authorEl.classList.remove('valid');
    isbnEl.classList.remove('valid');

}

//Send data for storage in the local web host
BookDetails.prototype.saveInfoLocal = function(data) {
    //Check that there is a list of books in Local Storage?

    function checkLocal() {
        const library = [];

        let resultBooks;

        if (localStorage.getItem("infoBook") === null) {
            resultBooks = localStorage.setItem("infoBook", JSON.stringify(library));
            resultBooks = JSON.parse(localStorage.getItem("infoBook"));
            return resultBooks;
        } else {
            resultBooks = JSON.parse(localStorage.getItem("infoBook"));
            return resultBooks;
        }
    }

    //Return the book list from Local Storage
    let array = checkLocal();


    //Add book information to an array
    const { author: Author, title: BookTitle, isbn: ISBNnumber } = data;
    array.push({ author: Author, title: BookTitle, isbn: ISBNnumber });

    //Add book information to Local Storage
    localStorage.setItem("infoBook", JSON.stringify(array));
};

//Remove the book from the list
BookDetails.prototype.deleteBook = function(infoBooks) {


    for (let i = 0; i < listBooks.length; i++) {

        if (
            listBooks[i].title === infoBooks[0] &&
            listBooks[i].author === infoBooks[1] &&
            listBooks[i].isbn === infoBooks[2]
        ) {
            const a = listBooks.splice(i, 1);
            localStorage.setItem("infoBook", JSON.stringify(listBooks));
        }
    }

    //Update elements when deleting a book
    html.showElmentDel();

};

//Function to show elements when deleting an item from Local Storage
HTMLUI.prototype.showElmentDel = function() {

    let lsitElement = document.querySelectorAll('tr');

    lsitElement = Array.from(lsitElement);

    lsitElement.splice(0, 1);


    //Remove all elements
    lsitElement.forEach(element => {

        element.remove();

    });

    //Run this function to recreate the elements for us later after deleting the elements
    this.showListDeatils();

}

//function
//=================================================================
function addBook(event) {
    //This code prevents our form from being submitted by clicking the Add Book button
    event.preventDefault();

    //check filed for validation
    const CheckEl = html.checkFileds(titleEl.value, authorEl.value, isbnEl.value);

    //Create elements to add books
    html.createElList(CheckEl);

}

//
function loadEvents() {
    //Show elements to display book information when the browser loads
    html.showListDeatils();
}

//Send book information to delete books
function deleteBook(event) {

    if (event.target.classList.contains("delete-icon")) {
        const trElement = event.target.parentElement.parentElement;

        const infoBook = [
            trElement.children[0].textContent,
            trElement.children[1].textContent,
            trElement.children[2].textContent,
        ];

        const delBook = new BookDetails();

        delBook.deleteBook(infoBook);
    }
}