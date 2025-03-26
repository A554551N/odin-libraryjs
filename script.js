const myLibrary = [];

function Book(title,author,pages,read) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read === true) {
            haveRead = "I've read it" 
        } else {
            haveRead = "I haven't read it"
        }
        return `${this.title} by ${this.author}, ${pages} pages.  ${this.haveRead}.`
    }
}

function addBookToLibrary(title,author,pages,read) {
    myLibrary.push(new Book(title,author,pages,read));
}

addBookToLibrary("The Hobbit","JRR Tolkien",350,true);
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis", 245, true)
addBookToLibrary("War and Peace","Leo Tolstoy",90000,false);

console.log(myLibrary[0].info())
const table = document.querySelector("#library-table-body");
for (const book of myLibrary) {
    console.log(book.info())
    const tr = document.createElement("tr");
    table.appendChild(tr);
    for (const prop in book) {
        console.log(typeof(book[prop]))
        if(typeof(book[prop]) !== 'function') {
            const td = document.createElement("td");
            td.textContent=book[prop];
            tr.appendChild(td);
        }
    }
}