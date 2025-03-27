const myLibrary = [];

function Book(title,author,pages,read) {
    this.id = crypto.randomUUID()
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let haveRead;
        if (this.read === true) {
            haveRead = "I've read it" 
        } else {
            haveRead = "I haven't read it"
        }
        return `${this.title} by ${this.author}, ${this.pages} pages.  ${haveRead}.`
    }
    this.toggleRead = function() {
        if (this.read) {
            this.read = false;
        } else {
            this.read = true;
        }
    }
}

function addBookToLibrary(title,author,pages,read) {
    myLibrary.push(new Book(title,author,pages,read));
}

addBookToLibrary("The Hobbit","JRR Tolkien",350,true);
addBookToLibrary("The Lion, The Witch, and the Wardrobe","CS Lewis", 245, true)
addBookToLibrary("War and Peace","Leo Tolstoy",90000,false);

const addBookButton = document.querySelector("#new-book-button");
addBookButton.addEventListener("click",(e) => {
    const sidebar = document.querySelector(".hidden-book-sidebar");
    sidebar.classList.remove("hidden-book-sidebar");
    sidebar.classList.add("add-book-sidebar");
    const titleInput = document.querySelector("#title");
    titleInput.focus();
})

const submitBookButton = document.querySelector("#submit-button");
submitBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title")
    const titleToAdd = title.value;
    const author = document.querySelector("#author")
    const authorToAdd = author.value;
    const pgNum = document.querySelector("#pages")
    const pgNumToAdd = pgNum.value;
    const haveReadElement = document.querySelectorAll("#haveread");
    let haveRead;
    for (e of haveReadElement) {
        if (e.checked) {
            haveRead = e.value;
        } 
    }
    if (titleToAdd === "" || authorToAdd  === "" || pgNumToAdd === "") {
        alert("You must submit a value for all fields.")
    } else {
        const sidebar = document.querySelector(".add-book-sidebar");
        sidebar.classList.add("hidden-book-sidebar");
        sidebar.classList.remove("add-book-sidebar");
        addBookToLibrary(titleToAdd,authorToAdd,pgNumToAdd,haveRead)
        title.value="";
        author.value="";
        pgNum.value="";
        haveReadElement[0].checked = true;
        renderTable();
    }    
})

function renderTable() {
const table = document.querySelector("#library-table-body");
table.replaceChildren();
    for (const book of myLibrary) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for (const prop in book) {
            if(typeof(book[prop]) !== 'function' && prop !== 'id') {
                const td = document.createElement("td");
                td.textContent=book[prop];
                tr.appendChild(td);
            }
        }
        const td = document.createElement("td")
        td.classList.add("button-column");

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("data-id",book.id);
        deleteButton.type = "button";
        deleteButton.classList.add("delete-button");

        const toggleReadButton = document.createElement("button");
        toggleReadButton.setAttribute("data-id",book.id);
        toggleReadButton.type = "button";
        toggleReadButton.classList.add("toggle-read-button");

        deleteButton.addEventListener("click", (e) => {
            const bookToDelete = e.target.dataset.id;
            for(i=0;i<myLibrary.length;i++) {
                if (myLibrary[i].id === bookToDelete) {
                    myLibrary.splice(i,1);
                }
            }
            renderTable();
        })

        toggleReadButton.addEventListener("click", (e) => {
            const bookToToggle = e.target.dataset.id;
            for(i=0;i<myLibrary.length;i++) {
                if (myLibrary[i].id === bookToToggle) {
                    myLibrary[i].toggleRead();
                    console.log("Click")
                }
            }
            renderTable();
        })

        td.appendChild(deleteButton);
        td.appendChild(toggleReadButton);
        tr.appendChild(td);
    }
}

renderTable();