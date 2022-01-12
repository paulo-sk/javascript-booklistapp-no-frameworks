//Book class: represents a book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//UI class: handle UI tasks
class UI {
    static displayBooks (){

        //so para exemplo
        const books = []

        books.forEach((book) => UI.addBookToList(book))

    }

    static addBookToList(book){
        const list = document.getElementById("book-list");

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-outline-danger btn-sm delete">x</a></td>
        `;
        list.appendChild(row)

    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}



//Store class: handles storage



//Event: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks())


//Event: add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent actual submit
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);

    //add book
    UI.addBookToList(book)

    //clear fields
    UI.clearFields()
})

//Event: delete book