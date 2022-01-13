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
        const books = Store.getBooks();

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

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        //ciando div e adicionando os nomes de classe do bootstrap
        const div = document.createElement('div');
        div.className = `alert alert-${className} text-center`;
        //colocando texto/mensagem na div
        div.appendChild(document.createTextNode(message))

        //como vou colocar essa div entre o container e o form, preciso pegar esses 2
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        //inset div antes de form (coloca a div entre o container e o form)
        container.insertBefore(div, form);

        //elimina a mensagem em 3 segundos
        setTimeout(() => {document.querySelector('.alert').remove()}, 3000)
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}



//Store class: handles storage
//localstorage don't save objects, you need to parse to string. It accepts a key: value kind of data
class Store{
    static getBooks(){

        let books;
        if(localStorage.getItem('books')=== null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}


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

    //validate data 
    if(title === '' || author == '' || isbn == ''){
        UI.showAlert('please, fill in all fields', 'danger')
    }else{

        //instantiate book
        const book = new Book(title, author, isbn);

        //add book on UI
        UI.addBookToList(book)

        //add book to localStorage
        Store.addBook(book);

        //show sucess message
        UI.showAlert('Book added', 'success')

        //clear fields
        UI.clearFields()
    }

    
})

//Event: delete book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    //deleted book from UI
    UI.showAlert('Book deleted', 'primary')

    //delete book from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

})