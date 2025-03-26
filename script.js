const myLibrary = [];

function Book(title,author,pages,read) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read === true) {
            const haveRead = "I've read it" 
        } else {
            const haveRead = "I haven't read it"
        }
        return `${this.title} by ${this.author}, ${pages} pages.  ${haveRead}.`
    }
}

function addBookToLibrary(title,author,pages,read) {
    myLibrary.push(new Book(title,author,pages,read));
}

addBookToLibrary("The Hobbit","JRR Tolkien",350,true);
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis", 245, true)
addBookToLibrary("War and Peace","Leo Tolstoy",90000,false);