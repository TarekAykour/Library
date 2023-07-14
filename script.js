let myLibrary = [] 
const openForm = document.querySelector('.open-form')
const form = document.querySelector('.form')
const modal = document.querySelector('.modal')
const title = document.querySelector('[name="title"]')
const author = document.querySelector('[name="author"]')
const release = document.querySelector('[name="release"]')
const pages = document.querySelector('[name="pages"]')
const input = document.querySelectorAll('input')
const read = document.querySelector('[name="checkbox"]')
const add = document.querySelector('.add')
// Table
const table = document.querySelector('.table')
const inLibrary = document.querySelector('.library-count')
const readCount= document.querySelector('.read-count')
const nonReadCount= document.querySelector('.non-read-count')
let readNum = 0;
let nonRead = 0;

if(JSON.parse(localStorage.getItem('books')))
{
inLibrary.innerHTML = JSON.parse(localStorage.getItem('books')).length
for(let i =0; i < JSON.parse(localStorage.getItem('books')).length;i++) {
  if(JSON.parse(localStorage.getItem('books'))[i].read == 'on' || JSON.parse(localStorage.getItem('books'))[i].read == true ){
    readNum++
  }
  else {
    nonRead++
  }

}

readCount.innerHTML = readNum
nonReadCount.innerHTML = nonRead
}
else
{
readCount.innerHTML = 0
nonReadCount.innerHTML = 0

}



openForm.addEventListener('click', ()=> {
    if(form.classList.contains('hidden') && !modal.classList.contains('form-is-open')){
      form.classList.remove('hidden')
      form.classList.add('display')
      modal.classList.add('form-is-open')
    }
  })
  
document.addEventListener('click', (event)=> {
    const isClickInside = form.contains(event.target)
    if(!isClickInside && form.classList.contains('display') && !form.classList.contains('hidden') && !openForm.contains(event.target)) {
      modal.classList.remove('form-is-open')
      form.classList.remove('display')
      form.classList.add('hidden')
    }
  })
  


const handleSubmit = (e) => {
  if(title.value != "" || author.value != "" || pages.value != "" )
  {
  const book = new Book(title.value, author.value, release.value, pages.value, read.checked ? true : false)
  book.addBookToLibrary()
  if(myLibrary.length < 0 || JSON.parse(localStorage.getItem('books')).length > 0){
    JSON.parse(localStorage.getItem('books')).forEach((book)=> {
    const row = document.createElement('tr');
    Object.keys(book).forEach((key)=> {
      const entry = document.createElement('td')
      const newCheckBox = document.createElement('input');
      newCheckBox.type ='checkbox'
      newCheckBox.classList.add('book-check')
      if(book.read)
      {
        entry.append(newCheckBox)
        
      }
      entry.textContent = book[key]
  
      row.append(entry) 
    })
    const newCheckBox = document.createElement('input');
    newCheckBox.type ='checkbox'
    newCheckBox.classList.add('book-check')
    
    row.append(newCheckBox)
    table.append(row)
    row.classList.add('book')
    // change book read
  
    if(book.read == true )
    {
      newCheckBox.checked = true
      row.classList.add('read')
      book.read = 'read'
      newCheckBox.addEventListener('change', ()=> {
        if(JSON.parse(localStorage.getItem('books'))[title]==book.title)
        {
          console.log(JSON.parse(localStorage.getItem('books'))[title])
        }
        
      })
    }
    else {
      newCheckBox.checked = false
      row.classList.add('not-read')
      newCheckBox.addEventListener('change', ()=> {
        if(JSON.parse(localStorage.getItem('books')) == book.title)
        {
          console.log(JSON.parse(localStorage.getItem('books')))
        }
      })
    }
  })
  }
  else {
    myLibrary.forEach((book)=> {
    const row = document.createElement('tr');
    Object.keys(book).forEach((key)=> {
      const entry = document.createElement('td')
      entry.textContent = book[key]
      row.append(entry) 
    })
    
    table.append(row)
    row.classList.add('book')
  })
  }

  }

}


add.addEventListener('click', (e)=> {
  handleSubmit(e)
})



function Book(title, author, date, pages, read) {
  this.title = title;
  this.author = author;
  this.date = date;
  this.pages = pages;
  this.read = read;

  this.addBookToLibrary = function() {
    // Load existing books from localStorage
    const existingBooks = localStorage.getItem("books");
    if (existingBooks) {
      myLibrary = JSON.parse(existingBooks);
    }

    // Add the new book to myLibrary
    const book = {
      id: this.id,
      title: this.title,
      author: this.author,
      date: this.date,
      pages: this.pages,
      read: this.read
    };
    myLibrary.push(book);
    // Save myLibrary to localStorage
    localStorage.setItem("books", JSON.stringify(myLibrary));
  };

  this.updateRead = function(title) {
    // Load existing books from localStorage
    const existingBooks = localStorage.getItem("books");
    if (existingBooks) {
      myLibrary = JSON.parse(existingBooks);
    }
  
    // Find the book with the specified title
    const book = myLibrary.find((book) => book.title === title);
  
    if (book) {
      // Toggle the read status
      book.read = !book.read;
  
      // Save myLibrary to localStorage
      localStorage.setItem("books", JSON.stringify(myLibrary));
    }
  };

  this.deleteEntry = function(title){
    
  }
}





//update book
function updateRead(title) {
  const books = JSON.parse(localStorage.getItem('books'));
  const book = books.find((book) => book.title === title);
  
  if (book) {
    if(book.read){
      document.querySelector('.book').classList.add('not-read')
      document.querySelector('.book').classList.remove('read')
    }
    else {
      document.querySelector('.book').classList.remove('not-read')
      document.querySelector('.book').classList.add('read')
    }
    book.read = !book.read;
    localStorage.setItem('books', JSON.stringify(books));


    }
  }



// Delete entry
function deleteBook(title) {
  const books = JSON.parse(localStorage.getItem('books'));
  const index = books.findIndex((book) => book.title === title);
  if (index !== -1) {
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
    displayBooks();
  }
}




// display books
function displayBooks() {

  JSON.parse(localStorage.getItem('books')).forEach((book) => {
    const row = document.createElement('tr');

    const titleEntry = document.createElement('td');
    titleEntry.textContent = book.title;
    row.appendChild(titleEntry);

    const authorEntry = document.createElement('td');
    authorEntry.textContent = book.author;
    row.appendChild(authorEntry);

    const dateEntry = document.createElement('td');
    dateEntry.textContent = book.date;
    row.appendChild(dateEntry);

    const pagesEntry = document.createElement('td');
    pagesEntry.textContent = book.pages;
    row.appendChild(pagesEntry);

    const readEntry = document.createElement('td');
    const readCheckbox = document.createElement('input');
    readCheckbox.type = 'checkbox';
    readCheckbox.checked = book.read;
    readCheckbox.addEventListener('change', () => {
      updateRead(book.title);
    });
    readEntry.appendChild(readCheckbox);
    row.appendChild(readEntry);

    const deleteEntry = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteBook(book.title);
    });
    deleteEntry.appendChild(deleteButton);
    row.appendChild(deleteEntry);

    table.appendChild(row);
    row.classList.add('book');
        if (book.read === true) {
      readCheckbox.checked = true;
      row.classList.add('read');
    } else {
      readCheckbox.checked = false;
      row.classList.add('not-read');
    }
  });
}

displayBooks()



